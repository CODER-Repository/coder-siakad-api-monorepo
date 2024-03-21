<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ClassRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        // Mendapatkan semua fakultas dari database
        $faculties = DB::table('faculty')->select('faculty_id', 'abbreviation')->get();

        foreach ($faculties as $faculty) {
            $facultyId = $faculty->faculty_id;
            $abbr = $faculty->abbreviation;

            // Generate 10 random classrooms for each faculty
            for ($i = 0; $i < 10; $i++) {
                // Generate a new random classroom name for each iteration
                $classroomName = ucfirst($faker->unique()->word);

                // Construct the classroom_id using abbreviation and a random number
                $classroomId = 'CLS-' . $abbr . '-' . $faker->unique()->numberBetween($min = 1, $max = 100);

                // Insert data into the classroom table
                DB::table('classroom')->insert([
                    'classroom_id' => $classroomId,
                    'classroom_name' => $classroomName,
                    'faculty_id' => $facultyId,
                ]);
            }
        }
    }
}
