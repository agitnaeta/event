import {useForm} from "@inertiajs/react";
import {useState, useEffect} from 'react';
import Creatable from 'react-select/creatable';
import {dateconvert} from "../../Helper/dateconvert.jsx";
export default function FormEditEvent({ showModal, setShowModal, selectedEvent, toast }) {
    const {
        data,
        setData,
        put,
        delete: destroy,
        errors,
        processing
    } = useForm({})

    const [invited, setInvited] = useState([])
    const [selected, setSelected] = useState([])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    // to handle form submit
    useEffect(()=>{
       setData(selectedEvent)
       if(selectedEvent.notifications){
           let _selected = [];
           selectedEvent.notifications.map((item,index)=>{
               _selected.push({
                   value: item.email,
                   label: item.email
               })
           })
           setInvited(_selected)
       }
    },[selectedEvent])



    useEffect(function (){
        let selectedInvites =[]
        let emails = []

        invited.map((item,index)=>{
            selectedInvites.push(invited[index])
            emails.push(item.value)
        })
        setSelected(selectedInvites)
        setData({
            ...data,
            ["emails"]: emails,
        });

    },[invited])

    const handleChangeInvite =(e)=>{
        let emails = [];
        e.map((item)=>{
            emails.push(item.value);
        })
        setData({...data,["emails"]:emails})
    }

    // submit form.
    const handleSubmit = (e) =>{
        e.preventDefault()
        put(`/events/${data.id}`,{
            preserveScroll: true,
            onSuccess : () => {
                setShowModal(false);
                toast(`Success edit event`)
            }
        });
    }

    const handleDelete = (e) =>{
        destroy(`/events/${e.target.id}`,{
            preserveScroll: true,
            onSuccess : () => {
                setShowModal(false);
                toast(`Success delete event`)
            }
        })
    }

    return (
        <>
            {showModal ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Event Name */}
                            <div>
                                <label htmlFor="title" className="input-label">Event Name*</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    className={errors.title ? "input-form" :'input-form'}
                                    placeholder="Enter event name"
                                />
                                {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="event" className="input-label">Notify to: (Email)</label>
                                <Creatable
                                    isMulti
                                    options={invited}
                                    value={selected}
                                    onChange={handleChangeInvite}
                                    id={"emails"}
                                    name={"emails"}
                                />
                                {errors['emails.0'] && <p className="text-red-400 text-sm">{errors['emails.0'] }</p>}
                            </div>



                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="input-label">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="input-form"
                                    placeholder="Enter event description"
                                />
                            </div>

                            {/* Start Date */}
                            <div>
                                <label htmlFor="start_date" className="input-label">Start Date*</label>
                                <input
                                    type="datetime-local"
                                    id="start_date"
                                    name="start_date"
                                    value={data.start_date}
                                    onChange={handleChange}
                                    className="input-form"
                                />
                                {errors.start_date && <p className="text-red-400 text-sm">{errors.start_date}</p>}
                            </div>

                            {/* End Date */}
                            <div>
                                <label htmlFor="end_date" className="input-label">End Date*</label>
                                <input
                                    type="datetime-local"
                                    id="end_date"
                                    name="end_date"
                                    value={data.end_date}
                                    onChange={handleChange}
                                    className="input-form"
                                />
                                {errors.end_date && <p className="text-red-400 text-sm">{errors.end_date}</p>}
                            </div>

                            {/* Locatoon */}
                            <div>
                                <label htmlFor="end_date" className="input-label">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={data.location}
                                    onChange={handleChange}
                                    className="input-form"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className={"flex flex-row justify-start"}>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-primary"
                                >
                                    {processing ? 'Loading' :'Submit' }
                                </button>
                                <a
                                    id={data.id}
                                    onClick={handleDelete}
                                    className="btn-danger">
                                    Delete
                                </a>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="btn-secondary">
                                    Close
                                </button>
                            </div>
                        </form>

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &#x2715;
                        </button>

                    </div>
                </div>
            ) : null}
        </>
    );
}
