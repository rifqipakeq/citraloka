<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Locations;
use App\Models\Categories;
use App\Models\Reviews;
use App\Models\Region;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $categoryId = $request->query('category');

        $query = Locations::query()
            ->with(['category','ticket','ticket.ticketCategory'])
            ->leftJoin('reviews','locations.id','=','reviews.location_id')
            ->select(
                'locations.*',
                DB::raw(
                    'ROUND(
                        (
                            (rate_kebersihan + rate_keakuratan + rate_checkin + rate_komunikasi + rate_lokasi + rate_nilaiekonomis) 
                            / 6)
                        , 2) 
                    as average_rating'
                )
            );

        if($search){
            $query->where('locations.title','like','%'.$search.'%');
        }

        if($categoryId){
            $query->where('locations.category_id',$categoryId);   
        }

        $locations = $query->paginate(9)->withQueryString();    
        
        $locations->getCollection()->transform(function ($location){
            $minPrice = $location->ticket->min('price_per_pack');
            $location->start_from = $minPrice ?? 0;
            return $location;
        });

        $categories = Categories::select('id','name')->get();

        return Inertia::render('Location',[
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
            ->with(['category','ticket','ticket.ticketCategory'])
            ->leftJoin('reviews','locations.id','=','reviews.location_id')
            ->select(
                'locations.*',
                DB::raw(
                    'ROUND(
                        (
                            (rate_kebersihan + rate_keakuratan + rate_checkin + rate_komunikasi + rate_lokasi + rate_nilaiekonomis) 
                            / 6)
                        , 2) 
                    as average_rating'
                )
            );

        if($search){
            $query->where('locations.title','like','%'.$search.'%');
        }

        if($region && $region !== 'all'){                        
            $query->where('locations.region_id', $region);
        }

        if($priceRange && $priceRange !== 'all'){
            [$minPrice, $maxPrice] = explode('-',$priceRange);
            
            $query->whereHas('ticket', function($q) use ($minPrice, $maxPrice){
                if($minPrice){
                    $q->where('price_per_pack','>=', $minPrice);
                }
                if($maxPrice){
                    $q->where('price_per_pack','<=', $maxPrice);
                }
            });
        }
        
        if($order === 'ASC' || $order === 'DESC'){
            $query->joinSub(
                DB::table('location_ticket')
                    ->join('tickets','location_ticket.ticket_id','=','tickets.id')
                    ->select('location_ticket.location_id',DB::raw('MIN(tickets.price_per_pack) as min_price'))
                    ->groupBy('location_ticket.location_id'),
                'min_ticket_prices',
                'locations.id',
                '=',
                'min_ticket_prices.location_id'
            )->orderBy('min_ticket_prices.min_price', $order);
        }

        $locations = $query->paginate(9)->withQueryString();

        $locations->getCollection()->transform(function ($location){
            $minPrice = $location->ticket->min('price_per_pack');
            $location->start_from = $minPrice ?? 0;
            return $location;
        });

        $categories = Categories::select('id','name')->get();
        $regions = Region::select('id','name')->get();

        return Inertia::render('Maps',[
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
