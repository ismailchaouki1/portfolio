<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|min:10',
            'honeypot' => ['sometimes', 'string', 'nullable'],
        ]);

        // Honeypot: if honeypot is filled, reject
        if (! empty($validated['honeypot'])) {
            return response()->json([
                'message' => 'Invalid request',
            ], 403);
        }

        $validated['is_read'] = false;

        $message = Message::create($validated);

        return response()->json([
            'message' => 'Message received',
            'id' => $message->id,
        ], 201);
    }
}
