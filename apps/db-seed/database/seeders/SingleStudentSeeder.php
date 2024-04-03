<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class SingleStudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        // Ganti NIM sesuai yang diinginkan
        $studentId = 'PruKQmQpe0VpQfLAt5tDaLxwnBiMcB';
        
        // Ganti dengan email yang sesuai
        $email = 'example@example.com';
        
        // Ganti dengan nama lengkap yang sesuai
        $fullName = 'John Doe';

        // Ganti dengan ID program studi yang sesuai
        $studyProgram = 1; // Misalnya 1 untuk ID program studi tertentu

        // Cari ID pengguna yang ada atau gunakan nilai default
        $userId = DB::table('user')->pluck('user_id')->first();

        DB::table('student')->insert([
            'nim' => $studentId,
            'email' => $email,
            'full_name' => $fullName,
            'major_id' => $studyProgram,
            'entry_year' => $faker->dateTimeBetween($startDate = '-10 years', $endDate = 'now')->format('Y-m-d'),
            'birth_date' => $faker->dateTimeBetween('-28 years', '-18 years')->format('Y-m-d'),
            'phone_number' => '08' . $faker->numberBetween($min = 100000000, $max = 999999999),
            'user_id' => $userId, 
        ]);
    }
}
