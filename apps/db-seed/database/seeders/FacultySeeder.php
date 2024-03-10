<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Menambahkan data fakultas secara manual
        DB::table('faculty')->insert([
            'faculty_id' => '1',
            'faculty_name' => 'Fakultas Sains Teknologi',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '2',
            'faculty_name' => 'Fakultas Ilmu Sosial dan Ilmu Politik',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '3',
            'faculty_name' => 'Fakultas Ekonomi dan Bisnis',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '4',
            'faculty_name' => 'Fakultas Hukum',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '5',
            'faculty_name' => 'Fakultas Psikologi',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '6',
            'faculty_name' => 'Fakultas Peternakan',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '7',
            'faculty_name' => 'Kedokteran',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '8',
            'faculty_name' => 'Fakultas Pertaninan',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '9',
            'faculty_name' => 'Fakultas Ilmu Budaya',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '10',
            'faculty_name' => 'Fakultas Ilmu Komunikasi',
        ]);

    }
}
