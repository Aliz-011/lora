<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PenilaianResource extends JsonResource
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
            'nilai' => $this->nilai,
            'edit_url' => route('penilaians.edit', $this->id),
            'kriteria' => $this->whenLoaded('kriteria'),
            'alternatif' => $this->whenLoaded('alternatif'),
        ];
    }
}
