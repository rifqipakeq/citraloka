<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class TransactionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:transactions index', only: ['index']),
        ];
    }

    public function index(Request $request) {
        $user = auth()->user();

        $transactions = Transaction::with('user', 'ticket')
            ->when(!$user->hasRole('admin'), function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            ->when($request->search, fn($query) => 
                $query->where('name', 'like', '%'.$request->search.'%')
            )
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return inertia('Transactions/Index', [
            'transactions' => $transactions,
            'filters' => $request->only(['search'])
        ]);
    }
}