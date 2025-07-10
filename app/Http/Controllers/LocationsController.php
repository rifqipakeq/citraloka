<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use App\Models\Locations;
use App\Models\Categories;
use App\Models\Ticket;

class LocationsController extends Controller
{
    public static function middleware()
    {
        return [
            new Middleware('permission:locations index', only: ['index']),
            new Middleware('permission:locations create', only: ['create', 'store']),
            new Middleware('permission:locations edit', only: ['edit', 'update']),
            new Middleware('permission:locations delete', only: ['destroy'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $locations = Locations::with('category','ticket')
        ->when($request->search, fn($query) => $query->where('title','like', '%'. $request->search. '%'))
        ->orderBy('title', 'ASC')
        ->paginate(6)
        ->withQueryString();

        return inertia('Locations/Index', ['locations' => $locations, 'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Categories::orderBy('name', 'ASC')->get();
        $tickets = Ticket::orderByRaw('CAST (SUBSTRING_INDEX(ticket_code, "T", -1) AS UNSIGNED) ASC')->get();

        return inertia('Locations/Create', ['categories' => $categories, 'tickets' => $tickets]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'image' => 'required|array',
            'image.*' => 'image|mimes:jpg,jpeg,png',
            'description' => 'required|string',
            'officehours' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'ticket_id' => 'required|exists:tickets,id',
            'phone' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric'
        ]);

        $imagePaths = [];

        foreach($request->file('image') as $imageFile) {
            $path = $imageFile->store('images','public');
            $imagePaths[] = $path;
        }

        Locations::create([
            'title' => $request->title,
            'description' => $request->description,
            'officehours' => $request->officehours,
            'category_id' => $request->category_id,
            'ticket_id' => $request->ticket_id,
            'phone' => $request->phone,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'image' => implode('|', $imagePaths),
        ]);

        return to_route('locations.index');


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
    public function edit(Locations $location)
    {
        $categories = Categories::orderBy('name', 'ASC')->get();
        $tickets = Ticket::orderByRaw('CAST (SUBSTRING_INDEX(ticket_code, "T", -1) AS UNSIGNED) ASC')->get();

        return inertia('Locations/Edit', ['categories' => $categories, 'tickets' => $tickets]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Locations $location)
    {
        $request->validate([
            'title' => 'required|string',
            'image' => 'required|array',
            'image.*' => 'image|mimes:jpg,jpeg,png',
            'description' => 'required|string',
            'officehours' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'ticket_id' => 'required|exists:tickets,id',
            'phone' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric'
        ]);

        if($request->image){
            $oldImages = explode('|', $location->image);
            foreach($oldImages as $oldImage){
                if(Storage::disk('public')->exists($oldImage)){
                    Storage::disk('public')->delete($oldImage);
                }
            }
        }

        $newImagePaths = [];

        foreach($request->file('image') as $imageFile) {
            $path = $imageFile->store('images','public');
            $newImagePaths[] = $path;
        }
        
        Locations::update([
            'title' => $request->title,
            'description' => $request->description,
            'officehours' => $request->officehours,
            'category_id' => $request->category_id,
            'ticket_id' => $request->ticket_id,
            'phone' => $request->phone,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'image' => implode('|', $newImagePaths),
        ]);

        return to_route('locations.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Locations $location)
    {
        if($location->image){
            $images = explode('|', $location->image);
            foreach($images as $image){
                if(Storage::disk('public')->exists($image)){
                    Storage::disk('public')->delete($image);
                }
            }
        }
        
        $location->delete();

        return back();
    }

}
