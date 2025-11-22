<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use App\Models\Locations;
use App\Models\Region;
use App\Models\Categories;
use App\Models\Ticket;

class LocationsController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:locations index', only: ['index']),
            new Middleware('permission:locations create', only: ['create', 'store']),
            new Middleware('permission:locations edit', only: ['edit', 'update']),
            new Middleware('permission:locations delete', only: ['destroy']),
        ];
    }

    public function index(Request $request)
    {
        $locations = Locations::with(['category', 'ticket'])
            ->when($request->search, fn($query) => $query->where('title', 'like', '%' . $request->search . '%'))
            ->orderBy('title', 'asc')
            ->paginate(5);

        return inertia('Locations/Index', [
            'locations' => $locations,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        $categories = Categories::orderBy('name', 'asc')->get();
    
        $tickets = Ticket::with('category')
            ->orderByRaw('CAST(SUBSTRING_INDEX(ticket_code, "T", -1) AS UNSIGNED) ASC')
            ->get()
            ->groupBy(function ($ticket) {
                return $ticket->category->name ?? 'Uncategorized';
            });

        $regions = Region::select('id', 'name')->get();
    
        return inertia('Locations/Create', [
            'categories' => $categories,
            'tickets' => $tickets,
            'regions' => $regions
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'image' => 'required|array',
            'image.*' => 'image|mimes:jpg,jpeg,png',
            'description' => 'required|string',
            'officehours' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'ticket_ids' => 'required|array',
            'ticket_ids.*' => 'exists:tickets,id',
            'region_id' => 'required|exists:regions,id',
            'phone' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);
    
        $imagePaths = [];
    
        foreach ($request->file('image') as $imageFile) {
            $path = $imageFile->store('images', 'public');
            $imagePaths[] = $path;
        }
    
        // Store location data
        $location = Locations::create([
            'title' => $request->title,
            'description' => $request->description,
            'officehours' => $request->officehours,
            'category_id' => $request->category_id,
            'region_id' => $request->region_id,
            'phone' => $request->phone,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'image' => implode('|', $imagePaths),
        ]);
    
        $ticketIds = $request->ticket_ids;

        if (!is_array($ticketIds)) {
            return back()->withErrors(['ticket_ids' => 'Invalid ticket selection.']);
        }
        
        $syncData = [];

        foreach ($ticketIds as $category => $ticketId) {
            $ticket = Ticket::find($ticketId);
            
            if ($ticket) {
                $syncData[$ticket->id] = [
                    'ticket_category_id' => $ticket->ticket_category_id
                ];
            }
        }
        
        $location->ticket()->attach($syncData);
    
        return to_route('locations.index');
    }

    public function edit(Locations $location)
    {
        $categories = Categories::orderBy('name', 'ASC')->get();
        $tickets = Ticket::with('category')
            ->orderByRaw('CAST(SUBSTRING_INDEX(ticket_code, "T", -1) AS UNSIGNED) ASC')
            ->get()
            ->groupBy(function ($ticket) {
                return $ticket->category->name ?? 'Uncategorized';
            });
        $regions = Region::select('id', 'name')->get();

        return inertia('Locations/Edit', [
            'location' => $location,
            'categories' => $categories,
            'tickets' => $tickets,
            'regions' => $regions,
        ]);
    }

    public function update(Request $request, Locations $location)
    {
        $request->validate([
            'title' => 'required|string',
            'image' => 'required|array',
            'image.*' => 'image|mimes:jpg,jpeg,png',
            'description' => 'required|string',
            'officehours' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'ticket_ids' => 'required|array',
            'ticket_ids.*' => 'exists:tickets,id',
            'region_id' => 'required|exists:regions,id',
            'phone' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        // Hapus semua gambar lama
        if ($location->image) {
            $oldImages = explode('|', $location->image);
            foreach ($oldImages as $oldImage) {
                if (Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        }

        $newImagePaths = [];

        // Upload gambar baru
        foreach ($request->file('image') as $imageFile) {
            $path = $imageFile->store('images', 'public');
            $newImagePaths[] = $path;
        }

        // Update database dengan gambar baru
        $location->update([
            'title' => $request->title,
            'description' => $request->description,
            'officehours' => $request->officehours,
            'category_id' => $request->category_id,
            'region_id' => $request->region_id,
            'phone' => $request->phone,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'image' => implode('|', $newImagePaths),
        ]);
    
        $ticketIds = $request->ticket_ids;

        if (!is_array($ticketIds)) {
            return back()->withErrors(['ticket_ids' => 'Invalid ticket selection.']);
        }
        
        $syncData = [];

        foreach ($ticketIds as $category => $ticketId) {
            $ticket = Ticket::find($ticketId);
            
            if ($ticket) {
                $syncData[$ticket->id] = [
                    'ticket_category_id' => $ticket->ticket_category_id
                ];
            }
        }
        
        $location->ticket()->sync($syncData);

        return to_route('locations.index');
    }

    public function destroy(Locations $location)
    {
        // Hapus semua gambar
        if ($location->image) {
            $images = explode('|', $location->image);
            foreach ($images as $image) {
                if (Storage::disk('public')->exists($image)) {
                    Storage::disk('public')->delete($image);
                }
            }
        }

        // Hapus data
        $location->delete();

        return back();
    }
}
