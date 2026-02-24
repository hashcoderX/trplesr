<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DestinationController extends Controller
{
    public function index()
    {
        return response()->json(Destination::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('destinations', 'public');
                $images[] = Storage::url($path);
            }
        }
        $data['images'] = $images;

        $destination = Destination::create($data);
        return response()->json($destination, 201);
    }

    public function show(Destination $destination)
    {
        return response()->json($destination->load('itineraries'));
    }

    public function update(Request $request, Destination $destination)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $images = $destination->images ?? [];
        if ($request->hasFile('images')) {
            // Delete old images
            foreach ($images as $img) {
                $path = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($path);
            }
            $images = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('destinations', 'public');
                $images[] = Storage::url($path);
            }
        }
        $data['images'] = $images;

        $destination->update($data);
        return response()->json($destination);
    }

    public function destroy(Destination $destination)
    {
        // Delete images
        if ($destination->images) {
            foreach ($destination->images as $img) {
                $path = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($path);
            }
        }
        $destination->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
