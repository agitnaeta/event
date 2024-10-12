<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable=[
        'email',
        'event_id',
        'status',
        'retry',
        'sent_at'
    ];

    public function event(){
        return $this->belongsTo(Event::class);
    }
}
