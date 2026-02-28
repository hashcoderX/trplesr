<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Return current user's profile with completion flag.
     */
    public function show(Request $request)
    {
        $user = $request->user();
        $isComplete = !empty($user->phone) && !empty($user->address);
        return response()->json([
            'user' => $user,
            'is_complete' => $isComplete,
        ]);
    }

    /**
     * Update profile fields for the current user.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['sometimes','string','max:255'],
            'phone' => ['sometimes','string','max:50'],
            'country' => ['sometimes','string','max:100'],
            'address' => ['sometimes','string','max:255'],
            'avatar_url' => ['sometimes','url','max:255'],
            'bio' => ['sometimes','string','max:2000'],
        ]);

        $user->fill($data);
        $user->save();

        $isComplete = !empty($user->phone) && !empty($user->address);
        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user,
            'is_complete' => $isComplete,
        ]);
    }
}
