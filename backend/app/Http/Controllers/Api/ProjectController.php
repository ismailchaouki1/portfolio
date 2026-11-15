<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Project::orderByDesc('is_featured')->orderBy('id')->get());
    }

    public function show(Project $project)
    {

        return response()->json($project);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'description' => 'nullable|string',
            'year' => 'required|string|max:4',
            'stack' => 'nullable|array',
            'stack.*' => 'string',
            'is_featured' => 'boolean',
        ]);

        $project = auth('sanctum')->projects()->create($validated);

        return response()->json($project, 201);
    }

    public function update(Request $request, Project $project)
    {

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'summary' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'year' => 'sometimes|required|string|max:4',
            'stack' => 'nullable|array',
            'stack.*' => 'string',
            'is_featured' => 'boolean',
        ]);

        $project->update($validated);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {

        $project->delete();

        return response()->json(null, 204);
    }
}
