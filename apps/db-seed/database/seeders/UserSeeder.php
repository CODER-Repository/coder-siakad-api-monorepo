<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Generate 1000 users
        for ($i = 0; $i < 1000; $i++) {
            $username = $faker->userName;

            // Check if username already exists
            $existingUser = DB::table('user')->where('username', $username)->first();
            if (!$existingUser) {
                DB::table('user')->insert([
                    'username' => $username,
                    'email' => $faker->unique()->safeEmail,
                    'password' => Hash::make('password'), 
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
