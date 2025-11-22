<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Locations;
use App\Models\Reviews;

class ReviewsController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:reviews index', only: ['index']),
            new Middleware('permission:reviews create', only: ['create', 'store']),
            new Middleware('permission:reviews edit', only: ['edit', 'update']),
            new Middleware('permission:reviews delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        $reviews = Reviews::with(['user', 'location','transaction'])
            ->when(!$user->hasRole('Dashboard'), function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            ->when($request->search, fn($query) => $query->where('review', 'like', '%'.$request->search.'%'))
            ->latest()
            ->paginate(6);

            return inertia('Reviews/Index', [
                'reviews' => $reviews,
                'filters' => $request->only(['search']),
                'can' => [
                    'create' => $request->user()->can('reviews create'),
                    'edit' => $request->user()->can('reviews edit'),
                    'delete' => $request->user()->can('reviews delete'),
                ],
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $transactions = Transaction::with('location')
            ->where('user_id', auth()->id())
            ->where('payment_status', 'PAID')
            ->get();
    
        return inertia('Reviews/Create', [
            'transactions' => $transactions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'transaction_id' => 'required|exists:locations,id',
            'review' => 'required|string|max:1000',
            'rate_kebersihan' => 'required|integer|min:1|max:5',
            'rate_keakuratan' => 'required|integer|min:1|max:5',
            'rate_checkin' => 'required|integer|min:1|max:5',
            'rate_komunikasi' => 'required|integer|min:1|max:5',
            'rate_lokasi' => 'required|integer|min:1|max:5',
            'rate_nilaiekonomis'=> 'required|integer|min:1|max:5'
        ]);

        $transaction = Transaction::findOrFail($request->transaction_id);

        Reviews::create([
            'user_id' => auth()->id(),
            'transaction_id' => $request->transaction_id,
            'review' => $request->review,
            'location_id' => $transaction->location_id,
            'rate_kebersihan' => $request->rate_kebersihan,
            'rate_keakuratan' => $request->rate_keakuratan,
            'rate_checkin' => $request->rate_checkin,
            'rate_komunikasi' => $request->rate_komunikasi,
            'rate_lokasi' => $request->rate_lokasi,
            'rate_nilaiekonomis' => $request->rate_nilaiekonomis
        ]);

        return to_route('reviews.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reviews $review)
    {
        if (!auth()->user()->hasRole('admin') && $review->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $locations = Locations::all();
        $transactions = Transaction::all();

        return inertia('Reviews/Edit', [
            'review' => $review,
            'locations' => $locations,
            'transactions' => $transactions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reviews $review)
    {
        if (!auth()->user()->hasRole('admin') && $review->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'transaction_id' => 'required|exists:locations,id',
            'review' => 'required|string|max:1000',
            'rate_kebersihan' => 'required|integer|min:1|max:5',
            'rate_keakuratan' => 'required|integer|min:1|max:5',
            'rate_checkin' => 'required|integer|min:1|max:5',
            'rate_komunikasi' => 'required|integer|min:1|max:5',
            'rate_lokasi' => 'required|integer|min:1|max:5',
            'rate_nilaiekonomis'=> 'required|integer|min:1|max:5'
        ]);

        $transaction = Transaction::findOrFail($request->transaction_id);

        $review->update([
            'user_id' => auth()->id(),
            'transaction_id' => $request->transaction_id,
            'review' => $request->review,
            'location_id' => $transaction->location_id,
            'rate_kebersihan' => $request->rate_kebersihan,
            'rate_keakuratan' => $request->rate_keakuratan,
            'rate_checkin' => $request->rate_checkin,
            'rate_komunikasi' => $request->rate_komunikasi,
            'rate_lokasi' => $request->rate_lokasi,
            'rate_nilaiekonomis' => $request->rate_nilaiekonomis
        ]);

        return to_route('reviews.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reviews $review)
    {
        if (!auth()->user()->hasRole('admin') && $review->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $review->delete();

        return back();
    }
}
