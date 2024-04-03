<?php

use App\Http\Controllers\TranscriptController;
use App\Http\Middleware\ProfileMiddleware;
use Illuminate\Support\Facades\Route;
/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// Menambahkan middleware 'auth' ke rute transcript
$router->group(['middleware' => ProfileMiddleware::class], function () use ($router) {
    $router->get('/api/v1/transcript', 'TranscriptController@getTranscript');
});