<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'content' => $this->content,
            'image' => $this->image && !(str_starts_with($this->image, 'http')) ?
                Storage::url($this->image) : $this->image,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'likes' => LikeResource::collection($this->whenLoaded('likes')),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }

}

