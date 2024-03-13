<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AnnouncementResource;
use App\Http\Request\AnnouncementCreateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
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

        $response = [
            'statusCode' => 201,
            'status' => true,
            'message' => 'Success Creating Announcement',
        ];

        return response()->json([
            'statusCode' => 201,
            'status' => true,
            'message' => 'Success Creating Announcement',]);
    }
}
