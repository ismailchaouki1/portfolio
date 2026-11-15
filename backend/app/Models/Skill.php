<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'icon',
    ];

    protected $casts = [];

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    }