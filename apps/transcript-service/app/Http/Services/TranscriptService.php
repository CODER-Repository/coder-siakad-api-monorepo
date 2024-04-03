<?php
namespace App\Http\Services;

use App\Models\Student;
use App\Models\KRS;
use App\Models\Course;
use App\Models\StudyProgram;
use Illuminate\Support\Facades\Log; 

class TranscriptService
{
    public function getTranscript($nim, $semester)
    {
        // Log permintaan
        Log::info('HTTP Request', [
            'method' => request()->getMethod(),
            'headers' => request()->header(),
            'url' => request()->fullUrl(),
        ]);

        // Ambil mahasiswa berdasarkan nim
        $student = Student::with('studyProgram')
            ->where('nim', $nim)
            ->first();

        if (!$student) {
            // Log permintaan gagal
            Log::error('Transcript Fetch Failed - Student not found', ['nim' => $nim]);
            return [];
        }

        // Ambil data transkrip berdasarkan nim dan semester
        $transcripts = KRS::with('course')
            ->join('course', 'krs.course_id', '=', 'course.course_id')
            ->select('course.course_name as study_program_name', 'course.credit_hours as credits', 'krs.grade as grade')
            ->where('krs.semester_id', $semester)
            ->where('krs.nim', $nim)
            ->get();

        $formattedTranscripts = [
            'semester' => $semester, // Tambahkan informasi semester
            'data' => [],
        ];    

        // Ubah hasil kueri menjadi array asosiatif
        $formattedTranscripts = [];
        foreach ($transcripts as $transcript) {
            $formattedTranscripts[] = [
                'study_program_id' => $student->studyProgram->study_program_id, 
                'study_program_name' => $transcript->study_program_name,
                'credits' => $transcript->credits,
                'grade' => $transcript->grade,
            ];
        }

        // Log status respons
        Log::info('HTTP Response', [
            'status_code' => 200,
            'data' => $formattedTranscripts,
        ]);

        return $formattedTranscripts;
    }

}
