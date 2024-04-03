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
            ClassRoomSeeder::class,
            AnnouncementSeeder::class,
            StudyProgramSeeder::class,
            LectureSeeder::class,
            CourseSeeder::class,
            ClassSeeder::class,
            StudentSeeder::class,
            KRSSeeder::class,
            ScheduleSeeder::class,
        ]);
    }
}
