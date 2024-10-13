<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('notif:daily')->dailyAt('08:00');
