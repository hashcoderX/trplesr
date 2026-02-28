<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function itinerary($filename)
    {
        // Serve itinerary images from the public disk regardless of nginx /storage config
        $path = 'itineraries/' . $filename;

        if (!Storage::disk('public')->exists($path)) {
            abort(404);
        }

        return Storage::disk('public')->response($path);
    }
    public function hotel($filename)
    {
        // Serve hotel images from the public disk regardless of nginx /storage config
        $path = 'hotels/' . $filename;

        if (!Storage::disk('public')->exists($path)) {
            abort(404);
        }

        return Storage::disk('public')->response($path);
    }

    public function activity($filename)
    {
        // Serve activity images from the public disk regardless of nginx /storage config
        $path = 'thinkstodo/' . $filename;

        if (!Storage::disk('public')->exists($path)) {
            abort(404);
        }

        return Storage::disk('public')->response($path);
    }

    public function restaurant($filename)
    {
        // Serve restaurant images from the public disk regardless of nginx /storage config
        $path = 'restaurants/' . $filename;

        if (!Storage::disk('public')->exists($path)) {
            abort(404);
        }

        return Storage::disk('public')->response($path);
    }

}
