<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ServicesController extends Controller
{
    /**
     * Return a list of featured hotels.
     */
    public function hotels(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 9);
        $hotels = Hotel::paginate($perPage);

        $data = $hotels->map(function ($hotel) {
            // Resolve first image and ensure absolute URL using asset() if relative
            $imagePath = (is_array($hotel->images) && count($hotel->images) > 0) ? $hotel->images[0] : null;
            if ($imagePath) {
                $imageUrl = str_starts_with($imagePath, 'http')
                    ? $imagePath
                    : asset(ltrim($imagePath, '/'));
            } else {
                $imageUrl = '';
            }

            return [
                'id' => $hotel->id,
                'name' => $hotel->name,
                'location' => $hotel->location,
                'rating' => (float) $hotel->rating,
                'price_per_night' => 100 + ($hotel->id * 20), // Mock price based on ID
                'image_url' => $imageUrl,
                'amenities' => ['Wi-Fi', 'Breakfast', 'Pool'], // Mock amenities
            ];
        });

        return response()->json([
            'status' => 'ok',
            'data' => $data,
            'pagination' => [
                'current_page' => $hotels->currentPage(),
                'last_page' => $hotels->lastPage(),
                'per_page' => $hotels->perPage(),
                'total' => $hotels->total(),
                'from' => $hotels->firstItem(),
                'to' => $hotels->lastItem(),
            ]
        ]);
    }

    /**
     * Return a list of popular activities.
     */
    public function activities(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 9);
        $page = $request->get('page', 1);

        $activities = collect([
            [
                'id' => 1,
                'title' => 'Kandy Cultural Day Tour',
                'location' => 'Kandy',
                'type' => 'Culture & Heritage',
                'rating' => 4.8,
                'duration_hours' => 8,
                'price' => 45,
                'image_url' => asset('storage/thinkstodo/kandy.png')
            ],
            [
                'id' => 2,
                'title' => 'Sigiriya Rock Fortress Climb',
                'location' => 'Sigiriya',
                'type' => 'Adventure',
                'rating' => 4.9,
                'duration_hours' => 5,
                'price' => 55,
                'image_url' => asset('storage/thinkstodo/sigiriya_rock.png')
            ],
            [
                'id' => 3,
                'title' => 'Ella Nine Arch Bridge Visit',
                'location' => 'Ella',
                'type' => 'Nature',
                'rating' => 4.7,
                'duration_hours' => 3,
                'price' => 25,
                'image_url' => asset('storage/thinkstodo/nine_arch.png')
            ],
            [
                'id' => 4,
                'title' => 'Galle Dutch Fort Walking Tour',
                'location' => 'Galle',
                'type' => 'History',
                'rating' => 4.8,
                'duration_hours' => 2,
                'price' => 20,
                'image_url' => asset('storage/thinkstodo/gall-dutch-fort.png')
            ],
            [
                'id' => 5,
                'title' => 'Mirissa Whale Watching',
                'location' => 'Mirissa',
                'type' => 'Ocean & Wildlife',
                'rating' => 4.6,
                'duration_hours' => 4,
                'price' => 60,
                'image_url' => asset('storage/thinkstodo/wals_wachching.png')
            ],
            [
                'id' => 6,
                'title' => 'Yala National Park Safari',
                'location' => 'Yala',
                'type' => 'Wildlife Safari',
                'rating' => 4.9,
                'duration_hours' => 4,
                'price' => 80,
                'image_url' => asset('storage/thinkstodo/yala-safari.png')
            ],
            [
                'id' => 7,
                'title' => 'Colombo City Tour',
                'location' => 'Colombo',
                'type' => 'City Experience',
                'rating' => 4.5,
                'duration_hours' => 4,
                'price' => 30,
                'image_url' => asset('storage/thinkstodo/colombo_city_tour.png')
            ],
            [
                'id' => 8,
                'title' => 'Nuwara Eliya Tea Plantation Tour',
                'location' => 'Nuwara Eliya',
                'type' => 'Tea & Nature',
                'rating' => 4.8,
                'duration_hours' => 6,
                'price' => 50,
                'image_url' => asset('storage/thinkstodo/nuwara-eliya-tea-plantation-tour.png')
            ],
            [
                'id' => 9,
                'title' => 'Bentota Water Sports',
                'location' => 'Bentota',
                'type' => 'Adventures',
                'rating' => 4.7,
                'duration_hours' => 3,
                'price' => 40,
                'image_url' => asset('storage/thinkstodo/betota-jetsky.png')
            ],
            [
                'id' => 10,
                'title' => 'Anuradhapura Ancient City Tour',
                'location' => 'Anuradhapura',
                'type' => 'UNESCO Heritage',
                'rating' => 4.9,
                'duration_hours' => 5,
                'price' => 35,
                'image_url' => asset('storage/thinkstodo/anuradhapura.png')
            ]
        ]);

        $total = $activities->count();
        $offset = ($page - 1) * $perPage;
        $paginatedItems = $activities->slice($offset, $perPage)->values();

        return response()->json([
            'status' => 'ok',
            'data' => $paginatedItems,
            'pagination' => [
                'current_page' => (int) $page,
                'last_page' => ceil($total / $perPage),
                'per_page' => (int) $perPage,
                'total' => $total,
                'from' => $offset + 1,
                'to' => min($offset + $perPage, $total),
            ]
        ]);
    }

    /**
     * Return a list of recommended restaurants.
     */
    public function restaurants(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 9);
        $page = $request->get('page', 1);

        $restaurants = collect([
            [
                'id' => 1,
                'name' => 'Spice Garden',
                'location' => 'Kandy',
                'rating' => 4.7,
                'cuisine' => 'Sri Lankan',
                'price_level' => '$$',
                'image_url' => asset('storage/restaurants/Spice-Garden.png')
            ],
            [
                'id' => 2,
                'name' => 'Ocean Breeze Cafe',
                'location' => 'Negombo',
                'rating' => 4.4,
                'cuisine' => 'Seafood',
                'price_level' => '$$',
                'image_url' => asset('storage/restaurants/Ocean-Breeze-Cafe.png')
            ],
            [
                'id' => 3,
                'name' => 'Ceylon Coffee House',
                'location' => 'Colombo',
                'rating' => 4.1,
                'cuisine' => 'Cafe',
                'price_level' => '$',
                'image_url' => asset('storage/restaurants/Ceylon-Coffee-House.png')
            ],
            [
                'id' => 4,
                'name' => 'Ministry of Crab',
                'location' => 'Colombo',
                'rating' => 4.8,
                'cuisine' => 'Seafood',
                'price_level' => '$$$',
                'image_url' => asset('storage/restaurants/Ministry-of-Crab.png')
            ],
            [
                'id' => 5,
                'name' => 'The Fortress',
                'location' => 'Galle',
                'rating' => 4.6,
                'cuisine' => 'Sri Lankan Fusion',
                'price_level' => '$$$',
                'image_url' => asset('storage/restaurants/The-Fortress.png')
            ],
            [
                'id' => 6,
                'name' => 'Paradise Road',
                'location' => 'Colombo',
                'rating' => 4.5,
                'cuisine' => 'Contemporary Sri Lankan',
                'price_level' => '$$$',
                'image_url' => asset('storage/restaurants/Paradise-Road.png')
            ],
            [
                'id' => 7,
                'name' => 'Dutch Hospital',
                'location' => 'Colombo',
                'rating' => 4.3,
                'cuisine' => 'International',
                'price_level' => '$$',
                'image_url' => asset('storage/restaurants/Dutch-Hospital.png')
            ],
            [
                'id' => 8,
                'name' => 'Gallery Cafe',
                'location' => 'Colombo',
                'rating' => 4.4,
                'cuisine' => 'Healthy & Organic',
                'price_level' => '$$',
                'image_url' => asset('storage/restaurants/Gallery-Cafe.png')
            ],
            [
                'id' => 9,
                'name' => 'The Lagoon',
                'location' => 'Colombo',
                'rating' => 4.2,
                'cuisine' => 'Seafood & Grill',
                'price_level' => '$$$',
                'image_url' => asset('storage/restaurants/The-Lagoon.png')
            ],
            [
                'id' => 10,
                'name' => 'Barefoot Garden Cafe',
                'location' => 'Colombo',
                'rating' => 4.6,
                'cuisine' => 'Sri Lankan',
                'price_level' => '$$',
                'image_url' => asset('storage/restaurants/Barefoot-Garden-Cafe.png')
            ],
            [
                'id' => 11,
                'name' => 'The Havelock',
                'location' => 'Colombo',
                'rating' => 4.7,
                'cuisine' => 'Fine Dining',
                'price_level' => '$$$',
                'image_url' => asset('storage/restaurants/thehavelock.png')
            ],
            [
                'id' => 12,
                'name' => 'Nihonbashi',
                'location' => 'Colombo',
                'rating' => 4.3,
                'cuisine' => 'Japanese',
                'price_level' => '$$$',
                'image_url' => asset('storage/restaurants/Nihonbashi.png')
            ],
            [
                'id' => 13,
                'name' => 'Tao',
                'location' => 'Colombo',
                'rating' => 4.5,
                'cuisine' => 'Asian Fusion',
                'price_level' => '$$$',
                'image_url' => asset('storage/restaurants/Tao.png')
            ],
            // [
            //     'id' => 14,
            //     'name' => 'The Kingsbury',
            //     'location' => 'Colombo',
            //     'rating' => 4.4,
            //     'cuisine' => 'International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2108364820138454?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 15,
            //     'name' => 'Cinnamon Grand',
            //     'location' => 'Colombo',
            //     'rating' => 4.2,
            //     'cuisine' => 'Sri Lankan & International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-1831924561075027?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 16,
            //     'name' => 'Amaya Lake',
            //     'location' => 'Dambulla',
            //     'rating' => 4.3,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-5814395029541644?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 17,
            //     'name' => 'Heritage Cafe',
            //     'location' => 'Kandy',
            //     'rating' => 4.1,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$',
            //     'image_url' => 'https://images.unsplash.com/photo-1498654077810-12f23f57df6f?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 18,
            //     'name' => 'Queens Hotel',
            //     'location' => 'Kandy',
            //     'rating' => 4.0,
            //     'cuisine' => 'Sri Lankan & Chinese',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-1630969748447748?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 19,
            //     'name' => 'Grand Oriental Hotel',
            //     'location' => 'Colombo',
            //     'rating' => 4.1,
            //     'cuisine' => 'Sri Lankan & International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2929440416934020?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 20,
            //     'name' => 'Jetwing Beach',
            //     'location' => 'Negombo',
            //     'rating' => 4.4,
            //     'cuisine' => 'Seafood & Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-9883553466141110?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 21,
            //     'name' => 'Anantara Peace Haven',
            //     'location' => 'Tangalle',
            //     'rating' => 4.6,
            //     'cuisine' => 'Sri Lankan & International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441180?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 22,
            //     'name' => 'Uga Bay',
            //     'location' => 'Galle',
            //     'rating' => 4.5,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441190?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 23,
            //     'name' => 'Raffles Colombo',
            //     'location' => 'Colombo',
            //     'rating' => 4.3,
            //     'cuisine' => 'International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441200?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 24,
            //     'name' => 'Shang Palace',
            //     'location' => 'Colombo',
            //     'rating' => 4.4,
            //     'cuisine' => 'Chinese',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441210?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 25,
            //     'name' => 'The Table',
            //     'location' => 'Colombo',
            //     'rating' => 4.6,
            //     'cuisine' => 'Modern European',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441220?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 26,
            //     'name' => 'BuBa',
            //     'location' => 'Colombo',
            //     'rating' => 4.3,
            //     'cuisine' => 'Seafood',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441230?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 27,
            //     'name' => 'Caffe Paradiso',
            //     'location' => 'Colombo',
            //     'rating' => 4.2,
            //     'cuisine' => 'Italian',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-4638834547778415?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 28,
            //     'name' => 'The Ivy',
            //     'location' => 'Colombo',
            //     'rating' => 4.5,
            //     'cuisine' => 'British',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-5558810196616538?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 29,
            //     'name' => 'The Mango Tree',
            //     'location' => 'Galle',
            //     'rating' => 4.4,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-9552548423536980?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 30,
            //     'name' => 'Peddlers Inn',
            //     'location' => 'Galle',
            //     'rating' => 4.3,
            //     'cuisine' => 'International',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-9823576455932180?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 31,
            //     'name' => 'The Sun House',
            //     'location' => 'Galle',
            //     'rating' => 4.7,
            //     'cuisine' => 'Sri Lankan Fusion',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 32,
            //     'name' => 'Amangalla',
            //     'location' => 'Galle',
            //     'rating' => 4.8,
            //     'cuisine' => 'Colonial Sri Lankan',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-1551782450-17144efb5723?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 33,
            //     'name' => 'The Fort Printers',
            //     'location' => 'Galle',
            //     'rating' => 4.5,
            //     'cuisine' => 'International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 34,
            //     'name' => 'Queensbury Hotel',
            //     'location' => 'Nuwara Eliya',
            //     'rating' => 4.4,
            //     'cuisine' => 'British Colonial',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441350?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 35,
            //     'name' => 'The Grand Hotel',
            //     'location' => 'Nuwara Eliya',
            //     'rating' => 4.3,
            //     'cuisine' => 'International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441360?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 36,
            //     'name' => 'St. Andrews Hotel',
            //     'location' => 'Nuwara Eliya',
            //     'rating' => 4.2,
            //     'cuisine' => 'Sri Lankan & International',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441370?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 37,
            //     'name' => 'The Hill Club',
            //     'location' => 'Nuwara Eliya',
            //     'rating' => 4.6,
            //     'cuisine' => 'Colonial',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441380?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 38,
            //     'name' => '98 Acres Resort',
            //     'location' => 'Ella',
            //     'rating' => 4.7,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441390?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 39,
            //     'name' => 'The View Ella',
            //     'location' => 'Ella',
            //     'rating' => 4.4,
            //     'cuisine' => 'International',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-8639358400941097?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 40,
            //     'name' => 'Ella Flower Garden',
            //     'location' => 'Ella',
            //     'rating' => 4.3,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2081770235210544?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 41,
            //     'name' => 'Cafe Chill',
            //     'location' => 'Ella',
            //     'rating' => 4.1,
            //     'cuisine' => 'Cafe',
            //     'price_level' => '$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441240?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 42,
            //     'name' => 'Jaffna Heritage Hotel',
            //     'location' => 'Jaffna',
            //     'rating' => 4.2,
            //     'cuisine' => 'Sri Lankan Tamil',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441400?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 43,
            //     'name' => 'Green Grass Hotel',
            //     'location' => 'Jaffna',
            //     'rating' => 4.0,
            //     'cuisine' => 'Seafood',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441250?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 44,
            //     'name' => 'Jetwing Jaffna',
            //     'location' => 'Jaffna',
            //     'rating' => 4.3,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441410?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 45,
            //     'name' => 'Anantara Trinco',
            //     'location' => 'Trincomalee',
            //     'rating' => 4.5,
            //     'cuisine' => 'Sri Lankan & International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441420?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 46,
            //     'name' => 'Chaaya Blu',
            //     'location' => 'Trincomalee',
            //     'rating' => 4.2,
            //     'cuisine' => 'Seafood',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441430?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 47,
            //     'name' => 'Nilaveli Beach Hotel',
            //     'location' => 'Trincomalee',
            //     'rating' => 4.1,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441440?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 48,
            //     'name' => 'Heritance Kandalama',
            //     'location' => 'Dambulla',
            //     'rating' => 4.7,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441450?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 49,
            //     'name' => 'Cinnamon Lodge',
            //     'location' => 'Habarana',
            //     'rating' => 4.3,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441460?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 50,
            //     'name' => 'Habarana Village',
            //     'location' => 'Habarana',
            //     'rating' => 4.4,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 51,
            //     'name' => 'The Wallawwa',
            //     'location' => 'Kandy',
            //     'rating' => 4.5,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441470?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 52,
            //     'name' => 'Earl\'s Regency',
            //     'location' => 'Kandy',
            //     'rating' => 4.2,
            //     'cuisine' => 'International',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441480?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 53,
            //     'name' => 'Hotel Suisse',
            //     'location' => 'Kandy',
            //     'rating' => 4.1,
            //     'cuisine' => 'Sri Lankan & European',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441490?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 54,
            //     'name' => 'Club Hotel Dolphin',
            //     'location' => 'Hikkaduwa',
            //     'rating' => 4.0,
            //     'cuisine' => 'Seafood',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441500?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 55,
            //     'name' => 'Hikkaduwa Beach Hotel',
            //     'location' => 'Hikkaduwa',
            //     'rating' => 4.1,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441510?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 56,
            //     'name' => 'Coral Sands Hotel',
            //     'location' => 'Hikkaduwa',
            //     'rating' => 4.2,
            //     'cuisine' => 'International',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441520?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 57,
            //     'name' => 'Mandara Resort',
            //     'location' => 'Weligama',
            //     'rating' => 4.4,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441530?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 58,
            //     'name' => 'Weligama Bay Marriott',
            //     'location' => 'Weligama',
            //     'rating' => 4.6,
            //     'cuisine' => 'International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441540?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 59,
            //     'name' => 'The Sands',
            //     'location' => 'Weligama',
            //     'rating' => 4.3,
            //     'cuisine' => 'Seafood',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-4302382000061221?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 60,
            //     'name' => 'Secret Garden',
            //     'location' => 'Mirissa',
            //     'rating' => 4.5,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2560897918405611?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 61,
            //     'name' => 'Mandara Rosen',
            //     'location' => 'Mirissa',
            //     'rating' => 4.4,
            //     'cuisine' => 'Sri Lankan Fusion',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-1772447622288042?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 62,
            //     'name' => 'Paradise Beach Club',
            //     'location' => 'Unawatuna',
            //     'rating' => 4.2,
            //     'cuisine' => 'Seafood',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-1470866170162272?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 63,
            //     'name' => 'Ceylon Beach',
            //     'location' => 'Unawatuna',
            //     'rating' => 4.1,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-3800712833794509?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 64,
            //     'name' => 'Taprobane Island',
            //     'location' => 'Beruwala',
            //     'rating' => 4.6,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441260?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 65,
            //     'name' => 'The Palms',
            //     'location' => 'Bentota',
            //     'rating' => 4.3,
            //     'cuisine' => 'International',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441270?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 66,
            //     'name' => 'Club Villa',
            //     'location' => 'Bentota',
            //     'rating' => 4.4,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441550?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 67,
            //     'name' => 'Arugam Bay Beach Resort',
            //     'location' => 'Arugam Bay',
            //     'rating' => 4.2,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441560?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 68,
            //     'name' => 'Siam View Hotel',
            //     'location' => 'Arugam Bay',
            //     'rating' => 4.0,
            //     'cuisine' => 'Thai & Sri Lankan',
            //     'price_level' => '$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441300?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 69,
            //     'name' => 'Yala Village Hotel',
            //     'location' => 'Yala',
            //     'rating' => 4.3,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-8879748245980285?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 70,
            //     'name' => 'Jetwing Yala',
            //     'location' => 'Yala',
            //     'rating' => 4.5,
            //     'cuisine' => 'Sri Lankan & International',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-7989446021936363?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 71,
            //     'name' => 'Cinnamon Wild Yala',
            //     'location' => 'Yala',
            //     'rating' => 4.4,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$$',
            //     'image_url' => 'https://images.unsplash.com/photo-1657438148520959?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 72,
            //     'name' => 'Polonnaruwa Rest House',
            //     'location' => 'Polonnaruwa',
            //     'rating' => 4.1,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441310?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 73,
            //     'name' => 'Sudu Araliya',
            //     'location' => 'Polonnaruwa',
            //     'rating' => 4.2,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441320?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 74,
            //     'name' => 'Deegayu Rest',
            //     'location' => 'Anuradhapura',
            //     'rating' => 4.0,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441330?w=400&h=300&fit=crop',
            // ],
            // [
            //     'id' => 75,
            //     'name' => 'Hotel Wilpattu',
            //     'location' => 'Anuradhapura',
            //     'rating' => 4.1,
            //     'cuisine' => 'Sri Lankan',
            //     'price_level' => '$$',
            //     'image_url' => 'https://images.unsplash.com/photo-2747127110441340?w=400&h=300&fit=crop',
            // ],
        ]);

        $total = $restaurants->count();
        $offset = ($page - 1) * $perPage;
        $paginatedItems = $restaurants->slice($offset, $perPage)->values();

        return response()->json([
            'status' => 'ok',
            'data' => $paginatedItems,
            'pagination' => [
                'current_page' => (int) $page,
                'last_page' => ceil($total / $perPage),
                'per_page' => (int) $perPage,
                'total' => $total,
                'from' => $offset + 1,
                'to' => min($offset + $perPage, $total),
            ]
        ]);
    }

    /**
     * Return a list of rental cars.
     */
    public function rentals(Request $request): JsonResponse
    {
        $data = [
            [
                'id' => 1,
                'car_type' => 'Compact',
                'brand' => 'Toyota',
                'model' => 'Vitz',
                'seats' => 4,
                'price_per_day' => 35,
                'image_url' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
            ],
            [
                'id' => 2,
                'car_type' => 'SUV',
                'brand' => 'Nissan',
                'model' => 'X-Trail',
                'seats' => 5,
                'price_per_day' => 60,
                'image_url' => 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
            ],
            [
                'id' => 3,
                'car_type' => 'Van',
                'brand' => 'Toyota',
                'model' => 'HiAce',
                'seats' => 9,
                'price_per_day' => 75,
                'image_url' => 'https://images.unsplash.com/photo-1605270018039-9430e4b7f4b2',
            ],
        ];

        return response()->json(['status' => 'ok', 'data' => $data]);
    }
}

