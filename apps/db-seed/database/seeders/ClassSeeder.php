<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ClassSeeder extends Seeder
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
        $courseIds = DB::table('course')->pluck('course_id')->toArray();
        $semesterIds = DB::table('semester')->pluck('semester_id')->toArray();
        $classroomIds = DB::table('classroom')->pluck('classroom_id')->toArray();

        for ($i = 0; $i < 25; $i++) {
            DB::table('class')->insert([
                'class_id' => 'CLASS'.str_pad($i+1, 3, '0', STR_PAD_LEFT),
                'course_id' => $courseIds[$i % count($courseIds)], 
                'lecturer_id' => $lecturerIds[$i % count($lecturerIds)], 
                'semester_id' => $semesterIds[$i % count($semesterIds)], 
                'classroom_id' => $classroomIds[$i % count($classroomIds)], 
                'schedule' => $faker->dayOfWeek().' '.$faker->time('H:i').'-'.$faker->time('H:i'), 
            ]);
        }
    }
}
