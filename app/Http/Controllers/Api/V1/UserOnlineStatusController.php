<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class UserOnlineStatusController extends Controller
{

    public function markOnline(int $id): void
    {
        $user = User::findOrFail($id);
        if ($user->status === 0) {
            $user->status = 1;
            $user->save();
            NotificationService::notify("$user->name is online", "$user->name is currently online");
        }
    }

    public function markOffline(int $id): void
    {
        $user = User::findOrFail($id);
        if ($user->status === 1) {
            $user->status = 0;
            $user->save();
            NotificationService::notify("$user->name is offline", "$user->name is currently offline");
        }
    }


}
