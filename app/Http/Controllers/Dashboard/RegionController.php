<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Region;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class RegionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:regions index', only: ['index']),
            new Middleware('permission:regions create', only: ['create', 'store']),
            new Middleware('permission:regions edit', only: ['edit', 'update']),
            new Middleware('permission:regions delete', only: ['destroy'])            
        ];
    }

    public function index(Request $request)
    {
        $regions = Region::select('id','name')
            ->when($request->search, fn($query) => 
                $query->where('name','like','%'.$request->search.'%')
            )
            ->orderBy('name','ASC')
            ->paginate(10)
            ->withQueryString();

        return inertia('Regions/Index',[
            'regions' => $regions,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return inertia('Regions/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:regions,name',
        ]);

        Region::create([
            'name' => $request->name,   
        ]);

        return to_route('regions.index')->with('success', 'Region Successfully Added');
    }

    public function edit(Region $region)
    {
        return inertia('Regions/Edit', ['region' => $region]);
    }

    public function update(Request $request, Region $region)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:regions,name,'.$region->id,
        ]);

        $region->update([
            'name' => $request->name,
        ]);

        return to_route('regions.index')->with('success','Region Successfully Updated');
    }

    public function destroy(Region $region)
    {
        $region->delete();

        return back()->with('success', 'Region Successfully Deleted');
    }
}
