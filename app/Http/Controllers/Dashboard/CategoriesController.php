<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Categories;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware("permission:categories index", only: ["index"]),
            new Middleware("permission:categories create", only: ["create", "store"]),
            new Middleware("permission:categories edit", only: ["edit", "update"]),
            new Middleware("permission:categories delete", only: ["destroy"]),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Categories::select("id", "name", "image")
            ->when($request->search, fn($query) =>
                $query->where("name", "like", "%".$request->search."%")
            )
            ->orderBy("name", "ASC")
            ->paginate(10)
            ->withQueryString();
            
        // Konversi path gambar ke URL agar bisa ditampilkan di tabel
        // filename.jpg
        foreach ($categories as $category) {
            $category->image_url = $category->image ? asset("storage/".$category->image) : null;
        }
        
        return inertia("Categories/Index", [
            "categories" => $categories,
            "filters" => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Categories/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|min:3|max:255|unique:categories,name",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048"
        ]);

        $imagePath = $request->hasFile("image") ? $request->file('image')->store('products', 'public') : null;

        Categories::create([
            "name" => $request->name,
            "image" => $imagePath
        ]);

        return to_route("categories.index")->with("success", "Kategori berhasil ditambahkan.");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categories $category)
    {
        return inertia("Categories/Edit", ["category" => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categories $category)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:categories,name,' . $category->id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        //jika ada gambar baru, hapus yang lama dan simpan yang baru
        if($request->hasFile('image')){
            if($category->image) {
                Storage::delete("public/" . $category->image);
            }
            $imagePath = $request->file("image")->store("products", "public");
            $category->image = $imagePath;
        }

        //update kategori
        $category->update([
            "name" => $request->name,
            "image" => $request->image
        ]);

        return to_route("categories.index")->with("success", "Kategori berhasil diperbarui.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categories $category)
    {
        if ($category->image) {
            Storage::delete("public/".$category->image);
        }

        $category->delete();

        return back()->with("success", "Kategori berhasil dihapus.");
    }
}
