<?php

namespace App\Http\Middleware;

use Closure;

class ProfileMiddleware
{
      /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $profile = $request->header('X-User-Profile');
        if (empty($profile)) {
        return response()->json([
            'statusCode' => 401,
            'status' => false,
            'error' => 'Unauthorized'
            ], 401);
        }
        $request->profile = json_decode($profile);

        return $next($request);
    }
}