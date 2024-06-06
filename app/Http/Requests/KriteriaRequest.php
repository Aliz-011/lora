<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KriteriaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'keterangan' => ['required', 'string', 'min:1'],
            'kode_kriteria' => ['required', 'string', 'min:1', 'unique:kriterias'],
            'bobot' => ['required', 'integer', 'min:1'],
            'jenis' => ['required', 'string', 'min:1'],
        ];
    }
}
