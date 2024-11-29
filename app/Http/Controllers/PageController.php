<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    public function index()
    {
        $userLogin = Auth::user();
        $user = User::where('id', $userLogin->id)->first();

        $posts = Post::with(['user', 'comments', 'likes'])
            ->orderBy('created_at', 'desc')
            ->paginate(5);
        return inertia("Dashboard", [
            'data' => PostResource::collection($posts),
            'user' => new UserResource($user),
        ]);
    }

    public function search()
    {
        $userLogin = Auth::user();

        $users = User::query()
            ->whereNot('id', $userLogin->id)
            ->paginate(20);
        return inertia("Search", [
            'data' => UserResource::collection($users),
        ]);
    }
    public function activity()
    {
        $users = User::query()->paginate(20);
        return inertia("Activity");
    }
    public function profile()
    {
        $user = Auth::user();
        $posts = Post::with(['user', 'comments', 'likes'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        return inertia("Profile", [
            'data' => PostResource::collection($posts)
        ]);
    }
}
