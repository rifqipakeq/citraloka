<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'ticket_code' => $this->faker->unique()->bothify('TICKET-####'),
        'name' => $this->faker->word(),
        'ticket_category_id' => \App\Models\TicketCategory::factory(),
        'price_per_pack' => $this->faker->numberBetween(10000, 100000),
        'qty' => $this->faker->numberBetween(1, 100),
        ];
    }
}
