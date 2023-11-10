<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppUserRequest;
use App\Http\Requests\UpdateAppUserRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Inertia\Response;

class AppUserController extends Controller
{

     /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('AppUsers/AppUsersIndex', [
            'users' => User::whereIn('user_type', ['admin'])->get()->toArray(),
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('AppUsers/AppUserCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppUserRequest $request): RedirectResponse
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'email_verified_at' => now(),
            'password' => Hash::make($request->input('password')),
            'user_type' => 'admin'
        ]);

        $user->assignRole('user');

        if ($request->hasFile('profile')) {
            $profile = $request->file('profile');
            if ($profile != null) {
                $path = Storage::disk('users')->put($user->id, $profile);
                $user->forceFill([
                    'profile' => $path
                ])->save();
            }
        }

        return redirect()->route('appuser.index');
    }

    /**
     * Assign Permission To User.
     */
    public function assignPermission(Request $request, string $id): void
    {
        $request->validate([
            'permission' => ['required', 'string', Rule::notIn(['0'])],
        ]);

        $user = User::findOrFail($id);

        $user->givePermissionTo($request->input('permission'));
    }

    /**
     * Revoke Permission From User.
     */
    public function revokePermission(Request $request, string $id): void
    {
        $request->validate([
            'permission' => ['required', 'string', Rule::notIn(['0'])],
        ]);

        $user = User::findOrFail($id);

        $user->revokePermissionTo($request->input('permission'));
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $user = User::findOrFail($id);
        return Inertia::render('AppUsers/AppUserPermissions', [
            'permissions' => $user->permissions()->get()->toArray(),
            'user_name' => $user->name
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        return Inertia::render('AppUsers/AppUserUpdate', [
            'user' => User::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppUserRequest $request, string $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $user->forceFill($request->validated());

        if ($request->filled('password')) {
            $request->validate([
                'password' => 'required|min:8|max:20|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/',
                'confirm_password' => 'required|min:8|max:20|required_with:password|same:password'
            ]);
            $user->forceFill([
                'password' => Hash::make($request->input('password'))
            ]);
        }

        if ($request->hasFile('profile')) {
            $profile = $request->file('profile');
            if ($profile != null) {
                $request->validate([
                    'profile' => 'nullable|image|mimes:jpg,png,jpeg',
                ]);
                $path = Storage::disk('users')->put($user->id, $profile);
                $user->forceFill([
                    'profile' => $path
                ]);

            }
        }

        $user->save();

        return redirect()->route('appuser.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }

}
