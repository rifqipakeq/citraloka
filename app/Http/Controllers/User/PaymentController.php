<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Locations;
use App\Models\Ticket;
use App\Models\TicketCategory;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\InvoiceApi;
use Xendit\Configuration;

class PaymentController extends Controller
{
    protected $apiInstance;

    public function __construct()
    {
        Configuration::setXenditKey(config('services.xendit.secret_key'));
        $this->apiInstance = new InvoiceApi();
    }

    public function handlePayment(Request $request)
    {
        if (!auth()->check()) {
            return redirect()->route('login')->with('message', 'You must be logged in to proceed.');
        }

        $action = $request->input('action');
        $locationId = $request->input('location_id');

        if ($action === 'pay') {
            return $this->processPayment($request);
        }

        if ($action === 'continue') {
            $transaction = Transaction::whereRaw('LOWER(status) = ?', ['pending'])
                ->where('location_id', $locationId)
                ->first();

            if (!$transaction || empty($transaction->checkout_link)) {
                return Inertia::back()->with('message', 'Invalid or expired transaction.');
            }

            return Inertia::location($transaction->checkout_link);
        }

        abort(400, 'Invalid action.');
    }

    public function processPayment(Request $request)
    {
        $uuid = (string) Str::uuid();

        $locationId = $request->input('location_id');
        $ticketId = $request->input('ticket_id');
        $ticketAmount = $request->input('ticket_quantity');
        $ticketPrice = $request->input('ticket_price');
        $ticketTax = $request->input('tax');
        $totalPrice = $request->input('total_price');

        $user = auth()->user();

        if (
            !$locationId || !$ticketId ||
            !$ticketAmount || !$ticketPrice || !$ticketTax || !$totalPrice
        ) {
            return redirect()->back()->with('message', 'Please fill in all required fields.');
        }
        
        $location = Locations::find($locationId);
        $ticket = Ticket::find($ticketId);
        
        if (!$location || !$ticket) {
            return redirect()->back()->with('message', 'Invalid ticket or location.');
        }

        $ticketCategory = TicketCategory::find($ticket->ticket_category_id);
        $ticketCategoryName = $ticketCategory->name ?? 'Umum';

        $transactionCode = 'TRX_' . mt_rand(100000, 999999);

        try {
            $description = <<<HTML
                Pemesanan Tiket<br>
                Lokasi: {$location->title}<br>
                Nama: {$user->name}<br>
                Nomor Telepon: {$user->phone}<br>
                Kode Transaksi: {$transactionCode}<br>
                HTML;

            $rawToken = Str::random(64);
            $hashedToken = hash('sha256', $rawToken);

            $createInvoiceRequest = new CreateInvoiceRequest([
                'external_id' => $uuid,
                'amount' => $totalPrice,
                'description' => $description,
                'invoice_duration' => 3600,
                'currency' => 'IDR',
                'customer' => [
                    'given_names' => $user->name,
                    'mobile_number' => $user->phone,
                ],
                'success_redirect_url' => route('payment.success'),
                'failure_redirect_url' => route('payment.failed'),
                'locale' => 'id',
                'items' => [[
                    'name' => "Tiket Masuk - " . $location->name,
                    'quantity' => (int) $ticketAmount,
                    'price' => (int) $ticketPrice,
                    'category' => $ticketCategoryName,
                    'url' => route('detail.index', ['id' => $locationId]),
                ]],
                'fees' => [[
                    'type' => 'PPN 10%',
                    'value' => $ticketTax,
                ]],
                "customer_notification_preference" => [
                    "invoice_paid" => ["whatsapp"],
                ],
            ]);

            $invoice = $this->apiInstance->createInvoice($createInvoiceRequest);

            Transaction::create([
                'code' => $transactionCode,
                'external_id' => $uuid,
                'validation_token' => $hashedToken,
                'checkout_link' => $invoice['invoice_url'],
                'payment_method' => "PENDING",
                'payment_status' => $invoice->getStatus(),
                'user_id' => $user->id,
                'ticket_id' => $ticketId,
                'location_id' => $locationId,
                'price_per_pack' => $ticketPrice,
                'ppn' => $ticketTax,
                'total' => $totalPrice,
                'qty' => $ticketAmount,
            ]);

            return Inertia::location($invoice['invoice_url']);

        } catch (\Exception $e) {
            Log::error('Failed to create invoice', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            dd($e->getMessage());
            return redirect()->back()->with('message', 'Failed to create invoice. Please try again.');
        }
    }

    public function paymentStatus(Request $request)
    {
        $externalId = $request->input('external_id');
        $token = $request->input('token');

        try {
            $transaction = Transaction::where('external_id', $externalId)->firstOrFail();

            if (!$this->validateToken($transaction, $token)) {
                abort(403, 'Invalid token.');
            }

            $result = $this->apiInstance->getInvoices(null, $externalId);
            $invoice = $result[0];

            if ($transaction->payment_status !== 'SETTLED'|| $transaction->payment_status !== 'PAID') {
                $transaction->payment_status = $invoice['status'];
                $transaction->payment_method = $invoice['payment_method'];
                $transaction->save();
            }

            $this->clearToken($transaction);

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil diproses.',
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to check payment status', [
                'message' => $e->getMessage(),
            ]);

            return Inertia::render('Payment/Failed');
        }
    }

    public function handleWebhook(Request $request)
    {
        if ($request->header('x-callback-token') !== config('services.xendit.webhook_secret')) {
            return response()->json(['message' => 'Unauthorized.'], 401);
        }

        try {
            $data = $request->all();

            $transaction = Transaction::where('external_id', $data['external_id'])->firstOrFail();

            $transaction->payment_status = $data['status'];
            $transaction->payment_method = $data['payment_method'];
            $transaction->updated_at = $data['updated'];
            $transaction->save();

            $this->clearToken($transaction);

            if (strtolower($transaction->payment_status) === 'paid') {
                Reviews::firstOrCreate([
                    'transaction_id' => $transaction->id,
                ], [
                    'user_id' => $transaction->user_id,
                    'location_id' => $transaction->location_id,
                    'review' => null,
                    'rate_kebersihan' => 0,
                    'rate_keakuratan' => 0,
                    'rate_checkin' => 0,
                    'rate_komunikasi' => 0,
                    'rate_lokasi' => 0,
                    'rate_nilaiekonomis' => 0,
                ]);
            }

            return response()->json([
                'code' => 200,
                'message' => 'Webhook received.',
            ]);
        } catch (\Exception $e) {
            Log::error('Webhook error', [
                'message' => $e->getMessage(),
            ]);

            return response()->json(['message' => 'Internal error.'], 500);
        }
    }

    protected function validateToken(Transaction $transaction, $token)
    {
        return hash_equals($transaction->validation_token ?? '', hash('sha256', $token));
    }

    protected function clearToken(Transaction $transaction)
    {
        $transaction->validation_token = null;
        $transaction->save();
    }
}
