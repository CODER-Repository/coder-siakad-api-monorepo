<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        // Fetch all classrooms
        $classrooms = DB::table('classroom')->pluck('classroom_id');

        // Generate 50 random courses
        for ($i = 0; $i < 50; $i++) {
            // Randomly select a classroom
            $classroomId = $faker->randomElement($classrooms);

            // Generate a random course name
            $courseName = $faker->unique()->word;

            // Extract the prefix from the course name (first 2 to 5 characters)
            $prefix = Str::substr($courseName, 0, $faker->numberBetween(2, 5));

            // Generate the course ID using the prefix and a random number
            $courseId = 'CRS-' . strtoupper($prefix) . '-' . $faker->unique()->numberBetween($min = 1, $max = 1000);

            // Generate a random credit hours
            $creditHours = $faker->numberBetween(1, 6);

            // Insert data into the course table
            DB::table('course')->insert([
                'course_id' => $courseId,
                'course_name' => $courseName,
                'credit_hours' => $creditHours,
                'classroom_id' => $classroomId,
            ]);
        }
    }
}
