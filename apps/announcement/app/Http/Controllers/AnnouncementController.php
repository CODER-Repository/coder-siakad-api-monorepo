<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AnnouncementResource;
use App\Http\Request\AnnouncementCreateRequest;
use App\Http\Services\PaginationValidationService;
use App\Models\Announcement;

class AnnouncementController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [ //Memvalidasi Request
            'title' => 'required|string',
            'content' => 'required|string',
            'type' => 'required|string|in:event,system-maintenance,achievement,deadline,policy-change,opportunity,graduation,emergency',
            'priority' => 'required|integer',
        ]);

        if ($validator->fails()) { //Jika gagal tervalidasi
            $errorDetails = [];
            foreach ($validator->errors()->toArray() as $field => $messages) {
                foreach ($messages as $message) {
                    $errorDetails[] = [
                        'msg' => $message,
                        'path' => $field
                    ];
                }
            }
            
            return response()->json([ //Response gagal tervalidasi
                'statusCode' => 400,
                'status' => false,
                'message' => 'Invalid Request Parameter',
                'error' => 'Bad Request',
                'errors' => $errorDetails,
            ], 400);
        }

        $announcement = Announcement::create([ //Eloquent Create
            'announcement_id' => Str::uuid(),
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'type' => $request->input('type'),
            'priority' => $request->input('priority'),
        ]);
        
        return response()->json([
            'statusCode' => 201,
            'status' => true,
            'message' => 'Success Creating Announcement',]);
    }

    public function get(Request $request, PaginationValidationService $paginationService)
    {
        // Validasi page size
        $pageSize = $paginationService->validatePageSize($request);
        if ($pageSize instanceof \Illuminate\Http\JsonResponse) {
            return $pageSize;
        }

        // Validasi page number
        $currentPage = $paginationService->validatePageNumber($request);
        if ($currentPage instanceof \Illuminate\Http\JsonResponse) {
            return $currentPage;
        }   

        // Mengambil daftar pengumuman dengan pagination menggunakan Eloquent ORM
        $announcements = Announcement::paginate($pageSize, ['*'], 'page', $currentPage);

        // Membuat respons JSON yang berisi data pengumuman beserta informasi pagination
        $response = [
            'statusCode' => 200,
            'status' => true,
            'data' => $announcements->items(),
            'message' => 'Success Fetching Announcement',
            'pagination' => [
                'total_rows' => $announcements->total(), // Jumlah total baris data yang tersedia.
                'total_page' => $announcements->lastPage(), // Jumlah total halaman berdasarkan jumlah total baris dan ukuran halaman.
                'current_page' => $announcements->currentPage(), //Halaman yang sedang ditampilkan saat ini.
                'page_size' => $announcements->perPage(), // Jumlah item per halaman.
            ]
        ];

        return response()->json($response);
    }
}



