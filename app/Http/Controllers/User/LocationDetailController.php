<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Locations;
use App\Models\TicketCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationDetailController extends Controller
{
    public function index($id)
    {
        $location = Locations::with(['category', 'ticket.ticketCategory', 'reviews.user'])->findOrFail($id);

        $ratingFields = [
            'rate_checkin', 
            'rate_keakuratan',
            'rate_kebersihan',
            'rate_komunikasi',
            'rate_lokasi',
            'rate_nilaiekonomis',
        ];

        $reviews = $location->reviews;
        $totalReviews = $reviews->count();

        $ratingAverages = [];

        foreach ($ratingFields as $field){
            $sum = $reviews->sum($field);
            $ratingAverages = $totalReviews > 0 ? round($sum / $totalReviews, 2) : 0;
        }

        // Get all unique ticket categories through the pivot
        $ticketCategories = $location->ticket->map(function ($ticket) {
            return $ticket->pivot->ticket_category_id;
        })->unique();

        // Load actual TicketCategory models using IDs from the pivot
        $ticketCategories = \App\Models\TicketCategory::whereIn('id', $ticketCategories)->get();

        $minPrice = $location->ticket->min('price_per_pack');
        $location->start_from = $minPrice ?? 0;
        
        return Inertia::render('Details', [
            'location' => $location,
            'ratingAverages' => $ratingAverages,
            'ticketCategories' => $ticketCategories,
        ]);
    }
}
