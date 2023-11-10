<?php


use App\Http\Controllers\Api\V1\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AppUserController;
use App\Http\Controllers\InboxController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TaskController;
use App\Models\Inbox;
use App\Models\Notify;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//  Route::get('/storage/link',function (){
//      \Illuminate\Support\Facades\Artisan::call('storage:link');
//      return 'Storage has been linked';
//  });


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home.index');

    Route::get('dashboard/profile', function () {
        return Inertia::render('Profile');
    })->name('profile.index');

    Route::post('dashboard/profile/update/{id}', ProfileController::class)
        ->name('profile.update');

    Route::get('/dashboard/appuser/index', [AppUserController::class, 'index'])
        ->name('appuser.index');

    Route::get('dashboard/appuser/create', [AppUserController::class, 'create'])
        ->name('appuser.create');

    Route::get('dashboard/appuser/{appuser}', [AppUserController::class, 'show'])
        ->name('appuser.show');

    Route::get('dashboard/appuser/{appuser}/edit', [AppUserController::class, 'edit'])
        ->name('appuser.edit');

    Route::post('dashboard/appuser/store', [AppUserController::class, 'store'])
        ->name('appuser.store');

    Route::delete('dashboard/appuser/{appuser}/delete', [AppUserController::class, 'destroy'])
        ->name('appuser.destroy');

    Route::post('dashboard/appuser/{appuser}/edit', [AppUserController::class, 'update'])
        ->name('appuser.update');

    Route::post('dashboard/appuser/{appuser}/assign', [AppUserController::class, 'assignPermission'])
        ->name('appuser.assign');

    Route::post('dashboard/appuser/{appuser}/revoke', [AppUserController::class, 'revokePermission'])
        ->name('appuser.revoke');

    Route::get('dashboard/inbox/compose', [InboxController::class, 'showCompose'])
        ->name('inbox.compose');

    Route::get('dashboard/inbox', [InboxController::class, 'index'])
        ->name('inbox.index');

    Route::post('dashboard/inbox/send', [InboxController::class, 'send'])
        ->name('inbox.send');

    Route::post('dashboard/inbox/reply/{inbox}', [InboxController::class, 'reply'])
        ->name('inbox.reply');

    Route::get('dashboard/inbox/{mail}', [InboxController::class, 'show'])
        ->name('inbox.show');

    Route::delete('dashboard/inbox/{mail}', [InboxController::class, 'destroy'])
        ->name('inbox.destroy');

    Route::delete('dashboard/notify/{notify}', function (Notify $notify) {
        $notify->delete();
    })->name('notify.delete');

    Route::get('dashboard/notify/clear', function () {
        Notify::truncate();
    })->name('notify.clear');


    Route::get('dashboard/tasks',[TaskController::class,'index'] )
        ->name('task.index');

    Route::get('dashboard/report',[ReportController::class,'index'] )
        ->name('report.index');
});


require __DIR__ . '/auth.php';
