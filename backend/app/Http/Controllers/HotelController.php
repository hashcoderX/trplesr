<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HotelController extends Controller
{
    public function index()
    {
        return response()->json(Hotel::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('hotels', 'public');
                $images[] = Storage::url($path);
            }
        }
        $data['images'] = $images;

        $hotel = Hotel::create($data);
        return response()->json($hotel, 201);
    }

    public function show(Hotel $hotel)
    {
        return response()->json($hotel->load('itineraries'));
    }

    public function update(Request $request, Hotel $hotel)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $images = $hotel->images ?? [];
        if ($request->hasFile('images')) {
            // Delete old images
            foreach ($images as $img) {
                $path = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($path);
            }
            $images = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('hotels', 'public');
                $images[] = Storage::url($path);
            }
        }
        $data['images'] = $images;

        $hotel->update($data);
        return response()->json($hotel);
    }

    public function destroy(Hotel $hotel)
    {
        // Delete images
        if ($hotel->images) {
            foreach ($hotel->images as $img) {
                $path = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($path);
            }
        }
        $hotel->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
