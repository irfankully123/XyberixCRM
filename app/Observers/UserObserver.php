<?php

namespace App\Observers;

use App\Models\User;
use App\Services\NotificationService;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {

    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        $original = $user->getOriginal();

        if ($user->isDirty('name')) {
            NotificationService::notify(
                "$user->name updated his name",
                "Name has been updated from {$original['name']} to {$user->name}"
            );
        }

        if ($user->isDirty('email')) {
            NotificationService::notify(
                "$user->name updated his email",
                "Email has been updated from {$original['email']} to {$user->email}"
            );
        }

        if ($user->isDirty('password')) {
            NotificationService::notify(
                "$user->name updated his password",
                "Password has been updated from its original state"
            );
        }
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
