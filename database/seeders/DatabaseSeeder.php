<?php

namespace Database\Seeders;

use App\Models\Locations;
use App\Models\Categories;
use App\Models\Ticket;
use App\Models\TicketCategory;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(ApiRegionSeeder::class);

        
        // Create specific categories
        Categories::create([
            'name' => 'history',
            'image' => 'https://vvxtkkwbymnvrulgaoce.supabase.co/storage/v1/object/public/category_images/category_history.svg'
        ]);
        
        Categories::create([
            'name' => 'artculture',
            'image' => 'https://vvxtkkwbymnvrulgaoce.supabase.co/storage/v1/object/public/category_images/category_artculture.svg'
        ]);
        
        Categories::create([
            'name' => 'mountain',
            'image' => 'https://vvxtkkwbymnvrulgaoce.supabase.co/storage/v1/object/public/category_images/category_mountain.svg'
        ]);
        
        Categories::create([
            'name' => 'shop',
            'image' => 'https://vvxtkkwbymnvrulgaoce.supabase.co/storage/v1/object/public/category_images/category_shop.svg'
        ]);
        
        Categories::create([
            'name' => 'themepark',
            'image' => 'https://vvxtkkwbymnvrulgaoce.supabase.co/storage/v1/object/public/category_images/category_themepark.svg'
        ]);
        
        TicketCategory::factory(3)->create();
        Ticket::factory(20)->create();
        Locations::factory(20)->create();
    }
}