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

    protected $appends = [
        'start',
        'end',
        'status',
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

    // Accessor to determine the event status
    protected function status(): Attribute
    {
        return Attribute::make(
            get: fn () => Carbon::now()->isBefore(Carbon::parse($this->attributes['end_date']))
                ? 'incoming' : 'completed',
        );
    }

    // Scope to filter only completed events
    public function scopeCompleted($query)
    {
        return $query->where('end_date', '<', Carbon::now());
    }

    // Scope to filter events that will start within 1 day
    public function scopeStartingInOneDay($query)
    {
        $now = Carbon::now();
        $tomorrow = $now->copy()->addDay();
        return $query->whereDate('start_date', '=', $tomorrow->toDateString());
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class, 'event_id', 'id');
    }
}
