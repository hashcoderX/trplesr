<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Start or resume a conversation for a visitor.
     */
    public function start(Request $request)
    {
        $visitorToken = $request->header('X-Visitor-Token') ?? $request->input('visitor_token');
        if (!$visitorToken) {
            $visitorToken = Str::uuid()->toString();
        }

        $conversation = Conversation::where('visitor_token', $visitorToken)
            ->where('status', 'open')
            ->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'visitor_token' => $visitorToken,
                'user_id' => null,
                'status' => 'open',
            ]);
        }

        return response()->json([
            'conversation_id' => $conversation->id,
            'visitor_token' => $visitorToken,
        ]);
    }

    /**
     * Get messages for a conversation.
     */
    public function messages(Request $request, Conversation $conversation)
    {
        // Visitor needs matching token or admin auth
        $visitorToken = $request->header('X-Visitor-Token');
        $isAdmin = false;
        if (Auth::check()) {
            $user = $request->user();
            $raw = (string)($user->roll ?? '');
            $normalized = strtolower(str_replace(['-', '_', ' '], '', $raw));
            $isAdmin = in_array($normalized, ['admin', 'superadmin'], true) ||
                (method_exists($user, 'hasAnyRole') && $user->hasAnyRole(['Admin', 'admin', 'superAdmin', 'super-admin']));
        }
        if (!$isAdmin && $conversation->visitor_token !== $visitorToken) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $messages = $conversation->messages()->orderBy('created_at')->get();
        return response()->json($messages);
    }

    /**
     * Post a message.
     */
    public function send(Request $request, Conversation $conversation)
    {
        $data = $request->validate([
            'content' => ['required', 'string', 'max:5000'],
        ]);

        $visitorToken = $request->header('X-Visitor-Token');
        $sender = 'visitor';

        if (Auth::check()) {
            $user = $request->user();
            $raw = (string)($user->roll ?? '');
            $normalized = strtolower(str_replace(['-', '_', ' '], '', $raw));
            $isAdmin = in_array($normalized, ['admin', 'superadmin'], true) ||
                (method_exists($user, 'hasAnyRole') && $user->hasAnyRole(['Admin', 'admin', 'superAdmin', 'super-admin']));
            if ($isAdmin) {
                $sender = 'admin';
                if (!$conversation->user_id) {
                    $conversation->user_id = $user->id;
                    $conversation->save();
                }
            }
        } else {
            // Validate visitor token matches conversation
            if ($conversation->visitor_token !== $visitorToken) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender' => $sender,
            'content' => $data['content'],
        ]);

        return response()->json(['message' => 'Sent', 'data' => $message], 201);
    }

    /**
     * Admin: list conversations.
     */
    public function adminList(Request $request)
    {
        $user = $request->user();
        $raw = (string)($user->roll ?? '');
        $normalized = strtolower(str_replace(['-', '_', ' '], '', $raw));
        $isAdmin = in_array($normalized, ['admin', 'superadmin'], true) ||
            (method_exists($user, 'hasAnyRole') && $user->hasAnyRole(['Admin', 'admin', 'superAdmin', 'super-admin']));
        if (!$isAdmin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $conversations = Conversation::with(['messages' => function ($q) { $q->orderBy('created_at', 'desc'); }])
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($conv) {
                $last = $conv->messages->first();
                return [
                    'id' => $conv->id,
                    'status' => $conv->status,
                    'last_message' => $last ? [ 'content' => $last->content, 'sender' => $last->sender, 'created_at' => $last->created_at ] : null,
                    'created_at' => $conv->created_at,
                ];
            });

        return response()->json($conversations);
    }
}
