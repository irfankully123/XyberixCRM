<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inbox>
 */
class InboxFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'source' => 'https://landingpage.xyberixsolutions.com/',
            'fullname' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'company' => fake()->company(),
            'phone' => fake()->phoneNumber(),
            'interest' => fake()->sentence(),
            'budget' => fake()->randomFloat(2, 1, 1000),
            'message' => fake()->text()
        ];
    }
}
