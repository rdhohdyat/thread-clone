<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function toggleLike(Post $post)
    {
        $like = Like::where('post_id', $post->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($like) {
            $like->delete();
            return response()->json(['status' => 'unliked']);
        } else {
            Like::create([
                'user_id' => Auth::id(),
                'post_id' => $post->id,
            ]);
            return response()->json(['status' => 'liked']);
        }
    }
}
