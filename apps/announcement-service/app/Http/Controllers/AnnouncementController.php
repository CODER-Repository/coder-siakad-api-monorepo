<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

use App\Http\Services\PaginationValidationService;
use App\Models\Announcement;
use Illuminate\Validation\ValidationException;

class AnnouncementController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [ // Validate Request
                'title' => 'required|string',
                'content' => 'required|string',
                'type' => 'required|string|in:event,system-maintenance,achievement,deadline,policy-change,opportunity,graduation,emergency',
                'priority' => 'required|integer',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator); // Throw ValidationException if validation fails
            }

            Announcement::create([
                'announcement_id' => Str::uuid(),
                'title' => $request->input('title'),
                'content' => $request->input('content'),
                'type' => $request->input('type'),
                'priority' => $request->input('priority'),
            ]);

            Log::info('Announcement Created', ['title' => $request->input('title')]);
            return response()->json([
                'statusCode' => 201,
                'status' => true,
                'message' => 'Success Creating Announcement',
            ], 201);

        } catch (ValidationException $e) {
            Log::error('Announcement Creation Failed', ['error' => $e->getMessage()]);
            $errorDetails = [];
            foreach ($e->errors() as $field => $messages) {
                foreach ($messages as $message) {
                    $errorDetails[] = [
                        'msg' => $message,
                        'path' => $field
                    ];
                }
            }

            return response()->json([
                'statusCode' => 400,
                'status' => false,
                'message' => 'Invalid Request Parameter',
                'error' => 'Bad Request',
                'errors' => $errorDetails,
            ], 400);

        } catch (\Exception $e) {
            Log::error('Announcement Creation Failed', ['error' => $e->getMessage()]);
            return response()->json([
                'statusCode' => 500,
                'status' => false,
                'message' => 'Internal Server Error',
                'error' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }

    public function get(Request $request, PaginationValidationService $paginationService)
    {
        try {
            $pageSize = $paginationService->validatePageSize($request);
            if ($pageSize instanceof \Illuminate\Http\JsonResponse) {
                return $pageSize;
            }

            $currentPage = $paginationService->validatePageNumber($request);
            if ($currentPage instanceof \Illuminate\Http\JsonResponse) {
                return $currentPage;
            }

            $announcements = Announcement::paginate($pageSize, ['*'], 'page', $currentPage);
            Log::info('Announcement Fetched', ['total' => $announcements->total()]);
//            $logger->info('[Announcement.get] Announcement Fetched', ['total' => $announcements->total()]);
            $response = [
                'statusCode' => 200,
                'status' => true,
                'data' => $announcements->items(),
                'message' => 'Success Fetching Announcement',
                'pagination' => [
                    'total_rows' => $announcements->total(),
                    'total_page' => $announcements->lastPage(),
                    'current_page' => $announcements->currentPage(),
                    'page_size' => $announcements->perPage(),
                ]
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Announcement Fetch Failed', ['error' => $e->getMessage()]);
            return response()->json([
                'statusCode' => 500,
                'status' => false,
                'message' => 'Internal Server Error',
                'error' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }
}
