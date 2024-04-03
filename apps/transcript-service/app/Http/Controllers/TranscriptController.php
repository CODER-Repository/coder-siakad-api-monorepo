<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Services\TranscriptService;

class TranscriptController extends Controller
{
    public function getTranscript(Request $request, TranscriptService $transcriptService)
    {
        try {
            $semester = $request->query('semester_id');
            $nim = $request->profile->nim;

            $transcript = $transcriptService->getTranscript($nim, $semester);
            // dd('aman');
            Log::info('Transcript Fetched', ['nim' => $nim, 'semester' => $semester]);
            return response()->json([
                'statusCode' => 200,
                'status' => true,
                'data' => $transcript,
                'message' => 'Success Fetching Transcript',
            ]);
        } catch (\Exception $e) {
            Log::error('Transcript Fetch Failed', ['error' => $e->getMessage()]);
            return response()->json([
                'statusCode' => 500,
                'status' => false,
                'message' => 'Internal Server Error',
                'error' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }
}
