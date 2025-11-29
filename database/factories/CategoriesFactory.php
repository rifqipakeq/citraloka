<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categories>
 */
class CategoriesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'name' => $this->faker->word(),
        'image' => 'https://vvxtkkwbymnvrulgaoce.supabase.co/storage/v1/object/public/category_images/category_image_example.jpeg',
        ];
    }
}
