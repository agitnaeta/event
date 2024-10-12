<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
            'title'=> ['required'],
            'start_date'=>['required'],
            'end_date'=>['required'],
            'emails.*'=>['email']
        ];
    }
    public function messages(): array
    {
        return [
            'emails.*.email' => 'Each invited person must have a valid email address.',
        ];
    }
}
