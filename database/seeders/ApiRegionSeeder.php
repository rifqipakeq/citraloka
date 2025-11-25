<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http as FacadesHttp;
use League\Uri\Http;

class ApiRegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $response = FacadesHttp::get('https://wilayah.id/api/regencies/34.json');
        $regions = $response->json();
        foreach ($regions['data'] as $region) {
            \App\Models\Region::create([
                'name' => $region['name'],
            ]);
        }
    }
}
