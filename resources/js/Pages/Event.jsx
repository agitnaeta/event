import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import React, {useEffect, useState} from 'react';
import FormAddEvent from "../Layouts/components/FormAddEvent.jsx";
import FormEditEvent from "../Layouts/components/FormEditEvent.jsx";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export default  function Event({events}){

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDate, setSelectedDate]= useState('');
    const [selectedEvent, setSelectedEvent] = useState({});

    // Handle date click
    const handleDate = (e) =>{
        setShowAddModal(true)
        if(!e.date){
            setSelectedDate(e.date)
        }
    }


    // Handling event edit
    const handleEvent = (e) =>{
        const id  = Number(e.event.id);
        let selectedEvent;
        events.map((event)=> {
            if(id === event.id) {
                selectedEvent = event;
            }
        })
        setSelectedEvent(selectedEvent)
        setShowEditModal(true)
    }


    return (
        <>
            <h1 className={"text-4xl mb-4"}> Event List </h1>
            <button onClick={handleDate} className={"btn-primary"}> + Add Event</button>
            <ToastContainer/>
            <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView={'dayGridMonth'}
                    dateClick={handleDate}
                    eventClick={handleEvent}
                    events={events}
                    eventContent={renderEventContent}
            />
            <FormAddEvent toast={toast} showModal={showAddModal} setShowModal={setShowAddModal} selectedDate={selectedDate} />
            <FormEditEvent toast={toast} showModal={showEditModal} setShowModal={setShowEditModal} selectedEvent={selectedEvent} />
        </>
    )
}

function renderEventContent(event){
    return (
        <>
            <div id={event.event.id} className={"bg-blue-500 p-2 rounded text-center text-white"}>
                {event.event.title}
            </div>
        </>
    )
}




