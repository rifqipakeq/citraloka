<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:permissions index', only: ['index']),
            new Middleware('permission:permissions create', only: ['create', 'store']),
            new Middleware('permission:permissions edit', only: ['edit', 'update']),
            new Middleware('permission:permissions delete', only: ['destroy'])
        ];
    }


    public function index(Request $request)
    {
        $permissions = Permission::select('id','name')
            ->when($request->search, fn($query) => $query->where('name','like', '%'. $request->search. '%'))
            ->latest()
            ->paginate(6)->withQueryString();

            return inertia('Permissions/Index', ['permissions' => $permissions, 'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Permissions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions']);

        Permission::create(['name' => $request->name]);

        return to_route('permissions.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        return inertia('Permissions/Edit', ['permission' => $permission]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions,name,' . $permission->id]);

        $permission->update(['name' => $request->name]);

        return to_route('permissions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();

        return back();
    }
}
