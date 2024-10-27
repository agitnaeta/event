<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Event;
use Illuminate\Support\Str;

class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $endDate = (clone $startDate)->modify('+'.rand(1, 3).' hours'); // End date 1 to 3 hours after start date

        return [
            'title' => $this->faker->sentence(5),               // Generates a random title
            'description' => $this->faker->sentence(10),           // Generates a random paragraph for description
            'start_date' => $startDate,                         // Random start date
            'end_date' => $endDate,                             // End date after start date
            'location' => $this->faker->city,                   // Generates a random city as location
            'created_at' => now(),                              // Current date and time
            'updated_at' => now(),                              // Current date and time
        ];
    }
}
