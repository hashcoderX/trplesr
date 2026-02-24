<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Itinerary extends Model
{
    protected $fillable = ['title', 'description', 'day_count', 'night_count', 'day_plans', 'images'];

    protected $casts = [
        'images' => 'array',
        'day_plans' => 'array',
        'day_count' => 'integer',
        'night_count' => 'integer',
    ];

    public function destinations()
    {
        return $this->belongsToMany(Destination::class);
    }

    public function hotels()
    {
        return $this->belongsToMany(Hotel::class);
    }
}
