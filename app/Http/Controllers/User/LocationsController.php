<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Locations;
use App\Models\Categories;
use App\Models\Reviews;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

use function PHPSTORM_META\map;

class LocationsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $categoryId = $request->query('category');

        $query = Locations::query()
            ->with(['category', 'ticket', 'ticket.ticketCategory'])
            ->leftJoin('reviews', 'locations.id', '=', 'reviews.location_id')
            ->select(
                'locations.*',
                DB::raw('ROUND(( 
                (rate_kebersihan + rate_keakuratan + rate_checkin + rate_komunikasi + rate_lokasi + rate_nilaiekonomis) / 6
            ), 2) as average_rating')
            );

        if ($search) {
            $query->where('locations.title', 'like', '%' . $search . '%');
        }

        if ($categoryId) {
            $query->where('locations.category_id', $categoryId);
        }

        $locations = $query->paginate(9)->withQueryString();

        $locations->getCollection()->transform(function ($location) {
            $minPrice = $location->ticket->min('price_per_pack');
            $location->start_from = $minPrice ?? 0;
            return $location;
        });

        $categories = Categories::select('id', 'name')->get();

        return Inertia::render('Location', [
            'locations' => $locations,
            'filters' => [
                'search' => $search,
                'category' => $categoryId,
            ],
            'categories' => $categories,
        ]);
    }

    public function maps(Request $request)
    {
        $search = $request->query('search');
        $categoryId = $request->query('category');
        $region = $request->query('region');
        $priceRange = $request->query('price_range');
        $order = $request->query('sort');

        $query = Locations::query()
            ->with(['category', 'ticket', 'ticket.ticketCategory'])
            ->leftJoin('reviews', 'locations.id', '=', 'reviews.location_id')
            ->select(
                'locations.*',
                DB::raw('ROUND(( 
                    (rate_kebersihan + rate_keakuratan + rate_checkin + rate_komunikasi + rate_lokasi + rate_nilaiekonomis) / 6
                ), 2) as average_rating')
            );

        if ($search) {
            $query->where('locations.title', 'like', '%' . $search . '%');
        }

        if ($categoryId && $categoryId !== 'all') {
            $query->where('locations.category_id', $categoryId);
        }

        if ($region && $region !== 'all') {
            $query->where('locations.region_id', $region);
        }

        if ($priceRange && $priceRange !== 'all') {
            [$minPrice, $maxPrice] = explode('-', $priceRange);

            $query->whereHas('ticket', function ($q) use ($minPrice, $maxPrice) {
                if ($minPrice) {
                    $q->where('price_per_pack', '>=', $minPrice);
                }
                if ($maxPrice) {
                    $q->where('price_per_pack', '<=', $maxPrice);
                }
            });
        }

        if ($order === 'asc' || $order === 'desc') {
            $query->joinSub(
                DB::table('location_ticket')
                    ->join('tickets', 'location_ticket.ticket_id', '=', 'tickets.id')
                    ->select('location_ticket.location_id', DB::raw('MIN(tickets.price_per_pack) as min_price'))
                    ->groupBy('location_ticket.location_id'),
                'min_ticket_prices',
                'locations.id',
                '=',
                'min_ticket_prices.location_id'
            )->orderBy('min_ticket_prices.min_price', $order);
        }

        $locations = $query->paginate(9)->withQueryString();

        //Menentukan dan menyimpan harga tiket termurah untuk setiap lokasi.
        $locations->getCollection()->transform(function ($location) {
            $minPrice = $location->ticket->min('price_per_pack');
            $location->start_from = $minPrice ?? 0;
            return $location;
        });

        $categories = Categories::select('id', 'name')->get();
        $regions = Region::select('id', 'name')->get();

        return Inertia::render('Maps', [
            'locations' => $locations,
            'filters' => [
                'search' => $search,
                'category' => $categoryId,
                'region' => $region,
                'price_range' => $priceRange,
                'order' => $order,
            ],
            'categories' => $categories,
            'regions' => $regions,
        ]);
    }

    public function nearestDestinations(Request $request)
    {
        $userLocation = [
            'lat' => $request->input('lat'),
            'lng' => $request->input('lng'),
            'max_distance_km' => $request->input('max_distance_km', 10),
        ];

        Log::info('User Location: ' . print_r($userLocation, true));
        $R = 6371;
        $locations = Locations::selectRaw("
        *, 
        ($R * acos(
            cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
            sin(radians(?)) * sin(radians(latitude))
        )) AS distance
    ", [$userLocation["lat"], $userLocation["lng"], $userLocation["lat"]])
            ->whereNotNull('latitude')
            ->orderBy('distance', 'ASC')
            ->limit(5)
            ->get();

        Log::info('Nearest Locations: ' . print_r($locations->values(), true));


        return response()->json([
            'locations' => $locations->values(),
        ]);
    }
}
