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
        $faculties = DB::table('faculty')->pluck('faculty_id');

        // Generate 50 random classrooms
        for ($i = 0; $i < 50; $i++) {
            // Memilih secara acak satu fakultas
            $facultyId = $faker->randomElement($faculties);

            // Menambahkan data kelas ke tabel
            DB::table('classroom')->insert([
                'classroom_id' => $faker->unique()->numberBetween($min = 1, $max = 100),
                'classroom_name' => $faker->unique()->word,
                'faculty_id' => $facultyId,
            ]);
        }
    }
}
