<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class KRSSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Ambil semua NIM yang ada dalam tabel student
        $studentNIMs = DB::table('student')->pluck('nim');

        // Ambil semua ID kursus yang ada dalam tabel course
        $courseIds = DB::table('course')->pluck('course_id');

        // Menghasilkan 50 entri palsu untuk tabel krs
        for ($i = 0; $i <= 50; $i++) {
            // Generate random year between 2018 and 2025
            $year = $faker->numberBetween(2018, 2025);
            // Generate random semester character ('A' for odd, 'B' for even)
            $semesterChar = $faker->randomElement(['A', 'B']);
            // Construct semester ID
            $semesterId = "$year$semesterChar";

            // Ambil NIM secara acak dari tabel student
            $studentId = $faker->randomElement($studentNIMs);

            // Ambil ID kursus secara acak dari tabel course
            $courseId = $faker->randomElement($courseIds);

            DB::table('krs')->insert([
                'nim' => $studentId,
                'course_id' => $courseId,
                'semester_id' => $semesterId,
                'grade' => $faker->numberBetween(0, 100),
                'created_at' => $faker->dateTimeThisMonth(),
                'updated_at' => $faker->dateTimeThisMonth(),
            ]);
        }
    }
}
