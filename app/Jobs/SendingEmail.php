<?php

namespace App\Jobs;

use App\Mail\EventNotification;
use App\Models\Event;
use App\Models\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendingEmail implements ShouldQueue
{
    use Queueable;

    protected Notification $notification;
    protected Event $event;

    protected string $time;

    /**
     * Create a new job instance.
     */
    public function __construct(Event $event, Notification $notification)
    {
        $this->notification = $notification;
        $this->event = $event;
        $this->time  = Carbon::now()->format('Y-m-d H:i:s');
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::to($this->notification->email)
                ->send(new EventNotification($this->event,$this->notification));
            $this->notification->update([
                'status'=>'success',
                'sent_at'=> $this->time,
                'retry'=>$this->notification->retry + 1
            ]);
            $this->notification->saveQuietly();
        }catch(\Exception $exception){
            $this->notification->update([
                'status'=>'failed',
                'sent_at'=> $this->time,
                'retry'=>$this->notification->retry + 1
            ]);
            $this->notification->saveQuietly();
        }
    }


    function fail($exception = null)
    {
        $this->notification->update([
            'status'=>'failed',
            'sent_at'=> $this->time,
            'retry'=>$this->notification->retry + 1
        ]);
        $this->notification->saveQuietly();
    }
}
