<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $fillable = ['name', 'location', 'rating', 'description', 'images'];

    protected $casts = [
        'images' => 'array',
        'rating' => 'decimal:1',
    ];

    public function itineraries()
    {
        return $this->belongsToMany(Itinerary::class);
    }
}
