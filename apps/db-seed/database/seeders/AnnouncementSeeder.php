<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            $announcement_id = Str::uuid();

            // Generate random announcement type from the enum
            $announcement_type = $faker->randomElement(['event', 'system-maintenance', 'achievement', 'deadline', 'policy-change', 'opportunity', 'graduation', 'emergency']);

            $existingAnnouncement = DB::table('announcement')->where('announcement_id', $announcement_id)->first();
            if (!$existingAnnouncement) {
                DB::table('announcement')->insert([
                    'announcement_id' => $announcement_id,
                    'title' => $faker->sentence,
                    'content' => $faker->paragraph,
                    'type' => $announcement_type,
                    'priority' => $faker->numberBetween(1, 10), // Adjust as needed
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
