<?php


use App\Http\Controllers\Api\V1\NotificationController;
use App\Http\Controllers\Api\V1\UserOnlineStatusController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/send/mail', NotificationController::class)->name('send.mail');
Route::get('/tasks', [TaskController::class, 'getTasks'])->name('tasks.fetch');
Route::get('/users/online/{id}', [UserOnlineStatusController::class, 'markOnline'])->name('users.online');
Route::get('/users/offline/{id}', [UserOnlineStatusController::class, 'markOffline'])->name('users.offline');

