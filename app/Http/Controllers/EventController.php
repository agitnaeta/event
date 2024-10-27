<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Services\NotificationService;
use Illuminate\Support\Benchmark;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with(['notifications'])->get();
        return inertia("Event",['events'=>$events ?: null]);
    }


    public function benchmark()
    {
       Benchmark::dd(fn()=> Event::with(['notifications'])->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
       $request->validate($request->rules());
       DB::transaction(function () use ($request) {
           $event = Event::create($request->all());
           $this->notificationService->createFromEvent($request,$event);
       });

       return redirect("/");
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return response()->json($event);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $request->validate($request->rules());
        DB::transaction(function () use ($request,$event) {
            $event->update($request->all());
            $this->notificationService->createFromEvent($request,$event);
        });

        return to_route('event.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return to_route('event.index');
    }
}
