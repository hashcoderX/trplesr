<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomQuote extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'travel_date',
        'guests',
        'message',
        'itinerary_id',
    ];

    protected $casts = [
        'travel_date' => 'date',
        'guests' => 'integer',
    ];

    public function itinerary(): BelongsTo
    {
        return $this->belongsTo(Itinerary::class);
    }
}
