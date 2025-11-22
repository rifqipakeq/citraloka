<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia('Welcome', [
            'categories' => Categories::all()
        ]);
    }
}
