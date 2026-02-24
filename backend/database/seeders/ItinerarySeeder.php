<?php

namespace Database\Seeders;

use App\Models\Itinerary;
use App\Models\Destination;
use App\Models\Hotel;
use Illuminate\Database\Seeder;

class ItinerarySeeder extends Seeder
{
    public function run()
    {
        // Create some destinations if they don't exist
        $colombo = Destination::firstOrCreate([
            'name' => 'Colombo',
            'city' => 'Colombo',
            'country' => 'Sri Lanka',
        ]);

        $kandy = Destination::firstOrCreate([
            'name' => 'Kandy',
            'city' => 'Kandy',
            'country' => 'Sri Lanka',
        ]);

        $galle = Destination::firstOrCreate([
            'name' => 'Galle',
            'city' => 'Galle',
            'country' => 'Sri Lanka',
        ]);

        // Create some hotels
        $hotel1 = Hotel::firstOrCreate([
            'name' => 'Shangri-La Colombo',
            'location' => 'Colombo',
        ]);

        $hotel2 = Hotel::firstOrCreate([
            'name' => 'Cinnamon Citadel Kandy',
            'location' => 'Kandy',
        ]);

        // Create itineraries
        $itinerary1 = Itinerary::create([
            'title' => 'Cultural Triangle Tour',
            'description' => 'Explore the ancient cities of Sri Lanka including Anuradhapura, Polonnaruwa, and Sigiriya.',
            'day_count' => 7,
            'night_count' => 6,
            'images' => ['/images/itinerary1.jpg'],
            'day_plans' => [
                [
                    'day' => 1,
                    'activities' => 'Arrival in Colombo, transfer to hotel',
                    'images' => []
                ],
                [
                    'day' => 2,
                    'activities' => 'Visit Anuradhapura ancient city',
                    'images' => []
                ],
                [
                    'day' => 3,
                    'activities' => 'Explore Polonnaruwa',
                    'images' => []
                ],
                [
                    'day' => 4,
                    'activities' => 'Sigiriya Rock Fortress',
                    'images' => []
                ],
                [
                    'day' => 5,
                    'activities' => 'Kandy Temple of Tooth',
                    'images' => []
                ],
                [
                    'day' => 6,
                    'activities' => 'Peradeniya Botanical Gardens',
                    'images' => []
                ],
                [
                    'day' => 7,
                    'activities' => 'Departure',
                    'images' => []
                ]
            ]
        ]);

        $itinerary1->destinations()->attach([$colombo->id, $kandy->id]);
        $itinerary1->hotels()->attach([$hotel1->id, $hotel2->id]);

        $itinerary2 = Itinerary::create([
            'title' => 'Southern Beach Tour',
            'description' => 'Relax on the beautiful beaches of southern Sri Lanka.',
            'day_count' => 5,
            'night_count' => 4,
            'images' => ['/images/itinerary2.jpg'],
            'day_plans' => [
                [
                    'day' => 1,
                    'activities' => 'Arrival in Colombo, transfer to Galle',
                    'images' => []
                ],
                [
                    'day' => 2,
                    'activities' => 'Galle Fort exploration',
                    'images' => []
                ],
                [
                    'day' => 3,
                    'activities' => 'Beach relaxation in Unawatuna',
                    'images' => []
                ],
                [
                    'day' => 4,
                    'activities' => 'Whale watching tour',
                    'images' => []
                ],
                [
                    'day' => 5,
                    'activities' => 'Departure',
                    'images' => []
                ]
            ]
        ]);

        $itinerary2->destinations()->attach([$galle->id]);
        $itinerary2->hotels()->attach([$hotel1->id]);

        $itinerary3 = Itinerary::create([
            'title' => 'Hill Country Adventure',
            'description' => 'Experience the misty hills and tea plantations of Sri Lanka.',
            'day_count' => 4,
            'night_count' => 3,
            'images' => ['/images/itinerary3.jpg'],
            'day_plans' => [
                [
                    'day' => 1,
                    'activities' => 'Arrival in Colombo, transfer to Nuwara Eliya',
                    'images' => []
                ],
                [
                    'day' => 2,
                    'activities' => 'Tea plantation tour',
                    'images' => []
                ],
                [
                    'day' => 3,
                    'activities' => 'Hiking in Horton Plains',
                    'images' => []
                ],
                [
                    'day' => 4,
                    'activities' => 'Departure',
                    'images' => []
                ]
            ]
        ]);

        $itinerary3->destinations()->attach([$kandy->id]);
        $itinerary3->hotels()->attach([$hotel2->id]);
    }
}