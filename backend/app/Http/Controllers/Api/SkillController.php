<?php

namespace App\Http\Controllers\Api;

use App\Models\Skill;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SkillController extends Controller
{

    public function index()
    {
        return response()->json(Skill::all());
    }

    public function show($id)
    {
    }
}
