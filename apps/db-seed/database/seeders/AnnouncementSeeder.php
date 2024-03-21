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

        for ($i = 0; $i < 100; $i++) {
            $announcement_id = Str::uuid();

            // Generate random announcement type from the enum
            $announcement_type = $faker->randomElement(['event', 'system-maintenance', 'achievement', 'deadline', 'policy-change', 'opportunity', 'graduation', 'emergency']);

            // Generate title based on announcement type
            $title = $this->generateTitle($announcement_type, $faker);

            $existingAnnouncement = DB::table('announcement')->where('announcement_id', $announcement_id)->first();
            if (!$existingAnnouncement) {
                DB::table('announcement')->insert([
                    'announcement_id' => $announcement_id,
                    'title' => $title,
                    'content' => $faker->sentence,
                    'type' => $announcement_type,
                    'priority' => $faker->numberBetween(1, 10), // Adjust as needed
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    /**
     * Generate title based on announcement type.
     *
     * @param string $announcementType
     * @param \Faker\Generator $faker
     * @return string
     */
    private function generateTitle($announcementType, $faker)
    {
        switch ($announcementType) {
            case 'event':
                return $faker->sentence . ' Event';
            case 'system-maintenance':
                return $faker->sentence . ' Maintenance';
            case 'achievement':
                return $faker->sentence . ' Achievement';
            case 'deadline':
                return $faker->sentence . ' Deadline';
            case 'policy-change':
                return $faker->sentence . ' Policy Change';
            case 'opportunity':
                return $faker->sentence . ' Opportunity';
            case 'graduation':
                return $faker->sentence . ' Graduation';
            case 'emergency':
                return $faker->sentence . ' Emergency';
            default:
                return $faker->sentence;
        }
    }
}
