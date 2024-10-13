<?php

namespace App\Console\Commands;

use App\Jobs\SendingEmail;
use App\Models\Event;
use App\Models\Notification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use function Clue\StreamFilter\fun;

class DailyNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notif:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Daily Notification for incoming event';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $eventsStartingTomorrow = Event::startingInOneDay()->get();
        $eventsStartingTomorrow->map(function($event){
            $notifications = Notification::where("event_id",$event->id)->get();
            $notifications->map(function ($notification) use ($event) {
                $this->info("Sending Email To $notification->email");
//                SendingEmail::dispatch($event,$notification);
            });
        });
    }
}
