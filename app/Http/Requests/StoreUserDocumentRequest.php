<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserDocumentRequest extends FormRequest
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
            'document_type' => 'required|string|max:50',
            'document_file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:30720',
            // 30 MB = 30 * 1024 KB = 30720 KB
            'document_number' => 'nullable|string|max:100',
        ];
    }
}
