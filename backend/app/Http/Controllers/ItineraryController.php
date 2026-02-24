<?php

namespace App\Http\Controllers;

use App\Models\Itinerary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItineraryController extends Controller
{
    public function index()
    {
        $itineraries = Itinerary::with('destinations', 'hotels')->get();
        
        // For public API, return only necessary fields
        return response()->json($itineraries->map(function ($itinerary) {
            return [
                'id' => $itinerary->id,
                'title' => $itinerary->title,
                'description' => $itinerary->description,
                'day_count' => $itinerary->day_count,
                'night_count' => $itinerary->night_count,
                'images' => array_map(function ($image) {
                    return url($image);
                }, $itinerary->images ?? []),
                'day_plans' => array_map(function ($plan) {
                    return [
                        'day' => $plan['day'],
                        'activities' => $plan['activities'],
                        'images' => array_map(function ($image) {
                            return url($image);
                        }, $plan['images'] ?? []),
                    ];
                }, $itinerary->day_plans ?? []),
                'destinations' => $itinerary->destinations->map(function ($dest) {
                    return [
                        'id' => $dest->id,
                        'name' => $dest->name,
                        'city' => $dest->city,
                        'country' => $dest->country,
                    ];
                }),
                'hotels' => $itinerary->hotels->map(function ($hotel) {
                    return [
                        'id' => $hotel->id,
                        'name' => $hotel->name,
                        'location' => $hotel->location,
                    ];
                }),
            ];
        }));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'day_count' => 'required|integer|min:1',
            'night_count' => 'required|integer|min:0',
            'day_plans' => 'nullable|array',
            'day_plans.*.day' => 'required|integer|min:1',
            'day_plans.*.activities' => 'required|string',
            'day_plans.*.images' => 'sometimes|nullable|array',
            'destination_ids' => 'nullable|array',
            'destination_ids.*' => 'exists:destinations,id',
            'hotel_ids' => 'nullable|array',
            'hotel_ids.*' => 'exists:hotels,id',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // No need to calculate total_days, use day_count directly

        // Handle day_plans images
        if (isset($data['day_plans'])) {
            foreach ($data['day_plans'] as $index => &$plan) {
                $planImages = [];
                $files = $request->file("day_plans.{$index}.images", []);
                foreach ($files as $image) {
                    if ($image instanceof \Illuminate\Http\UploadedFile) {
                        $path = $image->store('itineraries/days', 'public');
                        $planImages[] = Storage::url($path);
                    }
                }
                $plan['images'] = $planImages;
            }
        }

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('itineraries', 'public');
                $images[] = Storage::url($path);
            }
        }
        $data['images'] = $images;

        $itinerary = Itinerary::create($data);
        if ($request->destination_ids) {
            $itinerary->destinations()->attach($request->destination_ids);
        }
        if ($request->hotel_ids) {
            $itinerary->hotels()->attach($request->hotel_ids);
        }
        return response()->json($itinerary->load('destinations', 'hotels'), 201);
    }

    public function show(Itinerary $itinerary)
    {
        $itinerary->load('destinations', 'hotels');
        return response()->json([
            'id' => $itinerary->id,
            'title' => $itinerary->title,
            'description' => $itinerary->description,
            'day_count' => $itinerary->day_count,
            'night_count' => $itinerary->night_count,
            'images' => array_map(function ($image) {
                return url($image);
            }, $itinerary->images ?? []),
            'day_plans' => array_map(function ($plan) {
                return [
                    'day' => $plan['day'],
                    'activities' => $plan['activities'],
                    'images' => array_map(function ($image) {
                        return url($image);
                    }, $plan['images'] ?? []),
                ];
            }, $itinerary->day_plans ?? []),
            'destinations' => $itinerary->destinations->map(function ($dest) {
                return [
                    'id' => $dest->id,
                    'name' => $dest->name,
                    'city' => $dest->city,
                    'country' => $dest->country,
                ];
            }),
            'hotels' => $itinerary->hotels->map(function ($hotel) {
                return [
                    'id' => $hotel->id,
                    'name' => $hotel->name,
                    'location' => $hotel->location,
                ];
            }),
        ]);
    }

    public function update(Request $request, Itinerary $itinerary)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'day_count' => 'required|integer|min:1',
            'night_count' => 'required|integer|min:0',
            'day_plans' => 'nullable|array',
            'day_plans.*.day' => 'required|integer|min:1',
            'day_plans.*.activities' => 'required|string',
            'day_plans.*.images' => 'sometimes|nullable|array',
            'destination_ids' => 'nullable|array',
            'destination_ids.*' => 'exists:destinations,id',
            'hotel_ids' => 'nullable|array',
            'hotel_ids.*' => 'exists:hotels,id',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // No need to calculate total_days, use day_count directly

        // Handle day_plans images - merge with existing data
        if (isset($data['day_plans'])) {
            $existingDayPlans = $itinerary->day_plans ?? [];
            $updatedDayPlans = [];

            foreach ($data['day_plans'] as $index => $plan) {
                // Find existing plan by day number
                $existingPlan = collect($existingDayPlans)->firstWhere('day', $plan['day']);
                $planImages = $existingPlan['images'] ?? [];

                // Add any new uploaded images
                $files = $request->file("day_plans.{$index}.images", []);
                foreach ($files as $image) {
                    if ($image instanceof \Illuminate\Http\UploadedFile) {
                        $path = $image->store('itineraries/days', 'public');
                        $planImages[] = Storage::url($path);
                    }
                }

                $updatedDayPlans[] = [
                    'day' => $plan['day'],
                    'activities' => $plan['activities'],
                    'images' => $planImages,
                ];
            }

            $data['day_plans'] = $updatedDayPlans;
        }

        $images = $itinerary->images ?? [];
        if ($request->hasFile('images')) {
            // Delete old images
            foreach ($images as $img) {
                $path = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($path);
            }
            $images = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('itineraries', 'public');
                $images[] = Storage::url($path);
            }
        }
        $data['images'] = $images;

        $itinerary->update($data);
        $itinerary->destinations()->sync($request->destination_ids ?? []);
        $itinerary->hotels()->sync($request->hotel_ids ?? []);
        return response()->json($itinerary->load('destinations', 'hotels'));
    }

    public function destroy(Itinerary $itinerary)
    {
        // Delete images
        if ($itinerary->images) {
            foreach ($itinerary->images as $img) {
                $path = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($path);
            }
        }
        $itinerary->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
