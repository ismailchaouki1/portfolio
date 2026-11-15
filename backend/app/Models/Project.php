<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['title', 'summary', 'description', 'year', 'stack', 'is_featured'];

    protected $casts = [
        'stack' => 'array',
        'is_featured' => 'boolean',
    ];
}
