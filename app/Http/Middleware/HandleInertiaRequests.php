<?php

namespace App\Http\Middleware;

use App\Models\Notify;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'allNotifications' => Notify::all(),
            'superAdmin' => Auth::user() && Auth::user()->hasRole('super'),
            'user' => Auth::user() && Auth::user()->hasRole('user'),
            'create' => Auth::user() && Auth::user()->hasPermissionTo('create'),
            'update' => Auth::user() && Auth::user()->hasPermissionTo('update'),
            'destroy' => Auth::user() && Auth::user()->hasPermissionTo('delete'),
            'show' => Auth::user() && Auth::user()->hasPermissionTo('show'),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
