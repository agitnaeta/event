<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Event extends Model
{
    use HasFactory;

    public mixed $notifications;
    protected $fillable = [
      'title',
      'description',
      'start_date',
      'end_date',
      'location',
    ];

    protected $appends =[
        'start',
        'end',
    ];

    // Accessor for the 'start' attribute
    protected function start(): Attribute
    {
        return Attribute::make(
            get: fn () => Carbon::parse($this->attributes['start_date'])->format('Y-m-d\TH:i:s'),
        );
    }

    // Accessor for the 'end' attribute
    protected function end(): Attribute
    {
        return Attribute::make(
            get: fn () => Carbon::parse($this->attributes['end_date'])->format('Y-m-d\TH:i:s'),
        );
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class,'event_id','id');
    }
}
