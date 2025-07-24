<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class TicketController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:tickets index', only: ['index']),
            new Middleware('permission:tickets create', only: ['create', 'store']),
            new Middleware('permission:tickets edit', only: ['edit', 'update']),
            new Middleware('permission:tickets delete', only: ['destroy'])
        ];
    }
    
    public function index(Request $request)
    {
        $tickets = Ticket::select('id','ticket_code','name','price_per_pack','qty')
                ->when($request->search, fn($query) => $query->where('ticket_code','like','%'. $request->search.'%'))
                ->latest()
                ->paginate(5)
                ->withQueryString();

        foreach ($tickets as $ticket){
            $ticket->image_url = $ticket->image ? asset('/storage/'.$ticket->image) : null;
        }

        return inertia('Tickets/Index', ['tickets' => $tickets, 'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Tickets/Create');  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|in:Regular, VIP',
            'price_per_pack' => 'required|integer|min:0',
            'qty' => 'required|integer|min:1',
        ]);

        Ticket::create([
            'ticket_code' => 'T'. mt_rand(1000,9999),
            'name' => $request->name,
            'price_per_pack' => $request->price_per_pack,
            'qty' => $request->qty,
        ]);

        return to_route('tickets.index')->with('success', 'Ticket Successfully Added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        return inertia('Tickets/Edit', ['ticket'=> $ticket]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,Ticket $ticket)
    {
        $request->validate([
            'name' => 'required|in:Regular,VIP',
            'price_per_pack' => 'required|integer|min:0',
            'qty' => 'required|integer|min:1',
        ]);

        $ticket->update([
            'name' => $request->name,
            'price_per_pack' => $request->price_per_pack,
            'qty' => $request->qty,
        ]);

        return to_route('tickets.index')->with('success', 'Ticket Successfully Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return back()->with('success', 'Ticket Has Been Delete!');
    }
}
