<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        $users = DB::table('user')->select('user_id', 'email')->get();

        $studentsToGenerate = 50;

        foreach ($users as $key => $user) {
            if ($key >= $studentsToGenerate) {
                break;
            }

            $userId = $user->user_id;

            $studyProgram = DB::table('study_program')->select('faculty_id')->inRandomOrder()->first()->faculty_id;

            $studentId = strtoupper($faker->randomLetter) . $faker->unique()->numberBetween($min = 10000000, $max = 99999999);

            DB::table('student')->insert([
                'nim' => $studentId,
                'email' => $user->email,
                'full_name' => $faker->name,
                'major_id' => $studyProgram,
                'entry_year' => $faker->dateTimeBetween($startDate = '-10 years', $endDate = 'now')->format('Y-m-d'),
                'birth_date' => $faker->dateTimeBetween('-28 years', '-18 years')->format('Y-m-d'),
                'phone_number' => '08' . $faker->numberBetween($min = 100000000, $max = 999999999),
                'user_id' => $userId,
            ]);
        }
    }
}
