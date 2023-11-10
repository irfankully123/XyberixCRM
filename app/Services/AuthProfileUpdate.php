<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use JetBrains\PhpStorm\ArrayShape;
use Illuminate\Http\Request;


class AuthProfileUpdate
{

    public int $user_id;

    public function __construct(int $user_id)
    {
        $this->user_id=$user_id;
    }

    #[ArrayShape(['profile' => "string", 'name' => "string", 'email' => "string", 'old_password' => "array", 'new_password' => "string", 'confirm_password' => "string"])]
    private function rules(): array
    {
        return [
            'profile' => 'nullable|image|mimes:png,jpeg,jpg',
            'name' => 'required|min:3|max:50',
            'email' => 'required|string||email:rfc,dns|max:255|unique:users,email,' . Auth::id(),
            'old_password' => ['nullable', 'required_with:new_password', function ($attribute, $value, $fail) {
                if (!Hash::check($value, Auth::user()->getAuthPassword())) {
                    $fail('Old password is incorrect.');
                }
            }],
            'new_password' => 'nullable|required_with:old_password|min:8|max:20|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/',
            'confirm_password' => 'nullable|required_with:new_password|min:8|max:20|same:new_password',
        ];
    }

    #[ArrayShape(['new_password.regex' => "string", 'profile.dimensions' => "string"])]
    private function customMessages(): array
    {
        return [
            'new_password.regex' => 'Password is not strong enough eg:Admin@4427',
            'profile.dimensions' => 'Image Ratio is invalid (i.e : Ratio - 300x300 )'
        ];
    }

    #[ArrayShape(['password' => "string"])]
    private function setNewPassword(Request $request): array
    {
        return [
            'password' => Hash::make($request->input('new_password'))
        ];
    }

    #[ArrayShape(['profile' => "string"])]
    private function updateAsProfile(Request $request): array
    {
        $path = Storage::disk('users')->put(Auth::id(), $request->file('profile'));
        return [
            'profile' => $path
        ];
    }

    #[ArrayShape(['name' => "mixed", 'email' => "mixed"])]
    private function updateUserData(Request $request): array
    {
        return [
            'name' => $request->input('name'),
            'email' => $request->input('email')
        ];
    }


    public function profileUpdate(Request $request): void
    {
        $request->validate($this->rules(), $this->customMessages());

        $user = User::findOrFail($this->user_id);

        $user->forceFill($this->updateUserData($request))->save();

        if (!empty($request->input('old_password') && !empty($request->input('new_password') && !empty($request->input('confirm_password'))))) {
            $user->forceFill($this->setNewPassword($request))->save();
        }

        !empty($request->file('profile')) && $user->forceFill($this->updateAsProfile($request))->save();

    }
}
