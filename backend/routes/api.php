<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Auth\AuthUserController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json(['status' => 'ok']));

// public
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/education', [EducationController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:contact');
Route::post('/login', [AuthUserController::class, 'login']);

// protected (admin)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthUserController::class, 'logout']);
    Route::get('/user', fn (\Illuminate\Http\Request $r) => $r->user());

    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);
    Route::apiResource('skills', SkillController::class)->except(['index', 'show']);
    Route::apiResource('experiences', ExperienceController::class)->except(['index', 'show']);
    Route::apiResource('education', EducationController::class)->except(['index', 'show']);
});
