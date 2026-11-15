<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminEmail = env('ADMIN_EMAIL');
        $adminPassword = env('ADMIN_PASSWORD');

        if (!$adminEmail || !$adminPassword) {
            throw new RuntimeException(
                'ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env to seed the admin user.'
            );
        }

        User::create([
            'name' => 'Admin User',
            'email' => $adminEmail,
            'password' => Hash::make($adminPassword),
        ]);
    }
}