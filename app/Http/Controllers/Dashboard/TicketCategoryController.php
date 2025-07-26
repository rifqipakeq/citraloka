<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TicketCategory;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class TicketCategoryController extends Controller implements HasMiddleware
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
        $ticketCategories = TicketCategory::select('id','name')
            ->when($request->search, fn($query) => 
                $query->where('name','like','%'.$request->search.'%')
            )
            ->orderBy('name','ASC')
            ->paginate(10)
            ->withQueryString();

        return inertia('TicketCategories/Index',[
            'ticketCategories' => $ticketCategories,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return inertia('TicketCategories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:ticket_categories,name',
        ]);

        TicketCategory::create([
            'name' => $request->name,   
        ]);

        return to_route('ticket-categories.index')->with('success', 'Ticket Category Successfully Added');
    }

    public function edit(TicketCategory $ticketCategory)
    {
        return inertia('TicketCategories/Edit', ['ticketCategory' => $ticketCategory]);
    }

    public function update(Request $request, TicketCategory $ticketCategory)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:ticket_categories,name,'.$ticketCategory->id,
        ]);

        $ticketCategory->update([
            'name' => $request->name,
        ]);

        return to_route('ticket-categories.index')->with('success','Ticket Category Successfully Updated');
    }

    public function destroy(TicketCategory $ticketCategory)
    {
        $ticketCategory->delete();

        return back()->with('success', 'Ticket Category Successfully Deleted');
    }
}
