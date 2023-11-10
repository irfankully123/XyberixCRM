<?php

namespace App\Http\Controllers;


use App\Services\AuthProfileUpdate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, int $id)
    {
        (new AuthProfileUpdate($id))->profileUpdate($request);
    }
}
