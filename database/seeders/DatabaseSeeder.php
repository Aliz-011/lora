<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RoleSeeder::class
        ]);
        User::factory()->create([
            'id' => Str::createUuidsNormally(),
            'name' => 'Test User',
            'email' => 'test@example.com',
        ])->assignRole('superadmin');
        User::factory()->create([
            'id' => Str::createUuidsNormally(),
            'name' => 'Lora Nikijuluw',
            'email' => 'lora@example.com',
        ])->assignRole('admin');
    }
}
