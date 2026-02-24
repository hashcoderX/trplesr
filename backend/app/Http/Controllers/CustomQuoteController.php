<?php

namespace App\Http\Controllers;

use App\Models\CustomQuote;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class CustomQuoteController extends Controller
{
    /**
     * Store a newly created custom quote in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'travel_date' => 'nullable|date|after:today',
            'guests' => 'required|integer|min:1|max:50',
            'message' => 'nullable|string|max:1000',
            'itinerary_id' => 'required|exists:itineraries,id',
        ]);

        $customQuote = CustomQuote::create($validated);

        // Send email notification (optional - you can implement this later)
        // $this->sendQuoteNotification($customQuote);

        return response()->json([
            'message' => 'Custom quote request submitted successfully!',
            'data' => $customQuote,
        ], 201);
    }

    /**
     * Send email notification for new quote request
     */
    private function sendQuoteNotification(CustomQuote $quote)
    {
        // You can implement email sending here later
        // Mail::to('hello@triplesrtravelers.com')->send(new NewQuoteNotification($quote));
    }
}
