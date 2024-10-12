<?php

namespace App\Services;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Jobs\SendingEmail;
use App\Models\Event;
use App\Models\Notification;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;

class NotificationService
{
    /**
     * Delete notification list that related with event
     * @param Event $event
     * @return void
     *
     */
    public function deleteByEvent(Event $event): void
    {
        Notification::where("event_id",$event->id)->delete();
    }


    /**
     * @param FormRequest $request
     * @param Event $event
     * @return void
     */
    public function createFromEvent(FormRequest $request, Event $event): void
    {
        foreach($request->emails as $email){
            $notification  = Notification::create([
                'email'=>$email,
                'event_id'=>$event->id,
            ]);
            SendingEmail::dispatch($event,$notification);
        }
    }


    /**
     * @param FormRequest $request
     * @param Event $event
     * @return void
     */
    public function updateFromEvent(FormRequest $request, Event $event): void
    {
        $this->deleteByEvent($event);
        $this->createFromEvent($request, $event);
    }

}
