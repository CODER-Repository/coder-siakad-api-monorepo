<?php

namespace App\Http\Services;

use Illuminate\Http\Request;

class PaginationValidationService
{
    public static function validatePageSize(Request $request)
    {
        $pageSize = min($request->query('page_size', 5), 50);

        if ($pageSize < 1) {
            return response()->json([
                'statusCode' => 400,
                'status' => false,
                'message' => 'Invalid page size number. Page size number must be a > 1 positive integer.'
            ], 400);
        }

        return $pageSize;
    }

    public static function validatePageNumber(Request $request)
    {
        $currentPage = $request->query('page', 1);

        if ($currentPage < 1) {
            return response()->json([
                'statusCode' => 400,
                'status' => false,
                'message' => 'Invalid page number. Page number must be a > 1 positive integer.'
            ], 400);
        }

        return $currentPage;
    }
}
