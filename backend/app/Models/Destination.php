<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = ['name', 'country', 'city', 'description', 'images'];

    protected $casts = [
        'images' => 'array',
    ];

    public function itineraries()
    {
        return $this->belongsToMany(Itinerary::class);
    }
}
