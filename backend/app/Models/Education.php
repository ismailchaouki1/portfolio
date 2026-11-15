<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'education';

    protected $fillable = ['school', 'degree', 'field', 'city', 'start_year', 'end_year', 'details'];
}
