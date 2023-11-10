<?php

namespace App\Services;

use App\Events\NotificationEvent;
use App\Models\Notify;

class NotificationService
{

    public static function notify(string $title, string $body): void
    {
        $notify = Notify::create([
            'title' => $title,
            'body' => $body
        ]);
        event(new NotificationEvent($notify));
    }

}
