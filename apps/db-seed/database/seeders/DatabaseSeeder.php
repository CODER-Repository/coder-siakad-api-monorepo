<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            FacultySeeder::class,
            UserSeeder::class,
            StudentSeeder::class,
            ClassRoomSeeder::class,
            AnnouncementSeeder::class,
            StudyProgramSeeder::class,
            KRSSeeder::class,
            LectureSeeder::class,
            ClassSeeder::class,
            ScheduleSeeder::class,
        ]);
    }
}
