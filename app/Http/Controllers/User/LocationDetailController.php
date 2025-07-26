<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Locations;
use App\Models\TicketCategory;
use Inertia\Inertia;

class LocationDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    // got diff
    public function index($id)
    {
        $location = Locations::with(['category','ticket.ticket_category','reviews.user'])->findOrFail($id);
    
        $ratingFields = [
            'rate_checkin',
            'rate_keakuratan',
            'rate_kebersihan',
            'rate_komunikasi',
            'rate_lokasi',
            'rate_nilaiekonomis',
        ];

        $reviews = $location->reviews;
        $totalReview = $reviews->count();

        $ratingAverage = [];

        foreach($ratingFields as $field){
            $sum = $reviews->sum($field);
            $ratingAverage[$field] = $totalReview > 0 ? round($sum / $totalReview, 2) : 0; 
        }

        $ticketCategoriesIds = $location->ticket->pluck('pivot.ticket_category_id')->unique();

        $ticketCategories = TicketCategory::whereIn('id', $ticketCategoriesIds)->get();

        return Inertia::render('Details',[
            'location' => $location,
            'ratingAverages' => $ratingAverage,
            'ticketCategories' => $ticketCategories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
