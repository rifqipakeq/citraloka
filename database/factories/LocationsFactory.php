<?php

namespace Database\Factories;

use App\Models\Region;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Locations>
 */
class LocationsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $yogyakartaMinLat = -8.10;  
        $yogyakartaMaxLat = -7.50;  
        $yogyakartaMinLng = 110.00; // Batas Barat (lebih dekat ke Kulon Progo)
        $yogyakartaMaxLng = 110.80; 
        return [
            'image' => "https://vvxtkkwbymnvrulgaoce.supabase.co/storage/v1/object/public/location_images/example.jpg",
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'officehours' => '09:00 - 17:00',
            'category_id' => $this->faker->numberBetween(1, 5),
            'region_id' => Region::inRandomOrder()->first()->id,
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'latitude' => $this->faker->latitude($min = $yogyakartaMinLat, $max = $yogyakartaMaxLat),
            'longitude' => $this->faker->longitude($min = $yogyakartaMinLng, $max = $yogyakartaMaxLng),
        ];
    }
}
