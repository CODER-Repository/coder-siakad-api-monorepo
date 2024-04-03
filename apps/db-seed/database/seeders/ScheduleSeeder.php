<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $lecturerIds = DB::table('lecturer')->pluck('nip')->toArray();
        $studentIds = DB::table('student')->pluck('nim')->toArray();
        $courseIds = DB::table('course')->pluck('course_id')->toArray();
        $classIds = DB::table('class')->pluck('class_id')->toArray();
        $semesterIds = DB::table('semester')->pluck('semester_id')->toArray();

        for ($i = 0; $i < 25; $i++) {
            DB::table('schedule')->insert([
                'class_id' => $classIds[$i % count($classIds)], 
                'course_id' => $courseIds[$i % count($courseIds)], 
                'lecturer_id' => $lecturerIds[$i % count($lecturerIds)], 
                'semester_id' => $semesterIds[$i % count($semesterIds)], 
                'nim' => $studentIds[$i % count($studentIds)], 
                'day' => $faker->randomElement(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']), 
                'start_time' => $faker->time('H:i:s'), 
                'end_time' => $faker->time('H:i:s'), 
            ]);
        }
    }
}
