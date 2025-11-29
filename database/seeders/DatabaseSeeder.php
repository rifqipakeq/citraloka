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


        Locations::factory(50)->create();
        Categories::factory(5)->create();
        TicketCategory::factory(5)->create();
        Ticket::factory(20)->create();
        
    }
}