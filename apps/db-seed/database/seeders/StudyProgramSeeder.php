<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudyProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('study_program')->insert([
            ['study_program_name' => 'Ilmu Komputer', 'faculty_id' => 1],
            ['study_program_name' => 'Administrasi Bisnis', 'faculty_id' => 3],
            ['study_program_name' => 'Teknik Elektro', 'faculty_id' => 1],
            ['study_program_name' => 'Teknik Mesin', 'faculty_id' => 1],
            ['study_program_name' => 'Psikologi', 'faculty_id' => 5],
            ['study_program_name' => 'Biologi', 'faculty_id' => 1],
            ['study_program_name' => 'Matematika', 'faculty_id' => 1],
            ['study_program_name' => 'Sastra Inggris', 'faculty_id' => 9],
            ['study_program_name' => 'Ilmu Politik', 'faculty_id' => 2],
            ['study_program_name' => 'Ekonomi', 'faculty_id' => 3],
            ['study_program_name' => 'Teknik Kimia', 'faculty_id' => 1],
            ['study_program_name' => 'Fisika', 'faculty_id' => 1],
            ['study_program_name' => 'Sejarah', 'faculty_id' => 9],
            ['study_program_name' => 'Sosiologi', 'faculty_id' => 2],
            ['study_program_name' => 'Filosofi', 'faculty_id' => 9],
            ['study_program_name' => 'Ilmu Lingkungan', 'faculty_id' => 1],
            ['study_program_name' => 'Desain Grafis', 'faculty_id' => 1],
            ['study_program_name' => 'Teknologi Informasi', 'faculty_id' => 1],
            ['study_program_name' => 'Keamanan Siber', 'faculty_id' => 1],
            ['study_program_name' => 'Kecerdasan Buatan', 'faculty_id' => 1],
            ['study_program_name' => 'Ilmu Data', 'faculty_id' => 1],
            ['study_program_name' => 'Keperawatan', 'faculty_id' => 6],
            ['study_program_name' => 'Farmasi', 'faculty_id' => 6],
            ['study_program_name' => 'Teknik Sipil', 'faculty_id' => 1],
            ['study_program_name' => 'Arsitektur', 'faculty_id' => 1],
            ['study_program_name' => 'Pendidikan', 'faculty_id' => 9],
            ['study_program_name' => 'Manajemen Perhotelan', 'faculty_id' => 3],
            ['study_program_name' => 'Manajemen Pariwisata', 'faculty_id' => 3],
            ['study_program_name' => 'Akuntansi', 'faculty_id' => 3],
            ['study_program_name' => 'Keuangan', 'faculty_id' => 3],
            ['study_program_name' => 'Hubungan Internasional', 'faculty_id' => 2],
            ['study_program_name' => 'Hukum', 'faculty_id' => 4],
            ['study_program_name' => 'Kedokteran', 'faculty_id' => 7],
            ['study_program_name' => 'Kedokteran Gigi', 'faculty_id' => 7],
            ['study_program_name' => 'Kesehatan Masyarakat', 'faculty_id' => 7],
            ['study_program_name' => 'Kedokteran Hewan', 'faculty_id' => 6],
            ['study_program_name' => 'Pertanian', 'faculty_id' => 8],
            ['study_program_name' => 'Kehutanan', 'faculty_id' => 8],
            ['study_program_name' => 'Desain Fashion', 'faculty_id' => 9],
            ['study_program_name' => 'Desain Interior', 'faculty_id' => 9],
            ['study_program_name' => 'Jurnalisme', 'faculty_id' => 10],
            ['study_program_name' => 'Komunikasi Massa', 'faculty_id' => 10],
            ['study_program_name' => 'Musik', 'faculty_id' => 9],
            ['study_program_name' => 'Seni Teater', 'faculty_id' => 9],
            ['study_program_name' => 'Film', 'faculty_id' => 9],
        ]);
    }
}
