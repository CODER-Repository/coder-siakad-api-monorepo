<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnnouncementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'announcement_id' => $this->announcement_id,
            'title' => $this->title,
            'content' => $this->content,
            'type' => $this->type,
            'priority' => $this->priority,
            'created_at' => $this->created_at,
        ];
    }
}