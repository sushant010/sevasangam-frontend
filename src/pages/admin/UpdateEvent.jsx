import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateEvent = () => {


    const { id } = useParams();
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [temple, setTemple] = useState({});
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');


    useEffect(() => {
        fetchTemple();
        fetchCurrentEvent();


    }, []);

    const fetchTemple = async () => {
        try {
            const res = await axios.get(`${api}/temple/get-temple/${id}`);
            const { data } = res.data;
            setTemple(data);
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    };

    const fetchCurrentEvent = async () => {
        try {
            const res = await axios.get(`${api}/temple/event/fetch-event/${id}`);
            const { data } = res.data;

            setEventName(data.name);
            setEventDescription(data.description);
            setEventStartDate(new Date(data.date.start).toISOString().split('T')[0]); // Format the date to YYYY-MM-DD
            setEventEndDate(new Date(data.date.end).toISOString().split('T')[0]);
            setEventStartTime(data.timing.start.slice(0, 5));
            setEventEndTime(data.timing.end.slice(0, 5));

        } catch (error) {
            console.error(error);
            toast.error('Failed to update event');
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEventData = {
                name: eventName,
                description: eventDescription,
                date: {
                    start: eventStartDate,
                    end: eventEndDate,
                },
                timing: {
                    start: eventStartTime,
                    end: eventEndTime,
                },
                templeId: temple._id,
            };

            const res = await axios.put(`${api}/temple/event/update-event/${id}`, newEventData);
            if (res.data.success) {

                // Clear form fields
                setEventName('');
                setEventDescription('');
                setEventStartDate('');
                setEventEndDate('');
                setEventStartTime('');
                setEventEndTime('');
                // Optionally, display success message
                toast.success(res.data.message);
                window.scrollTo(0, 0);
                if (temple.createdBy.role === 1) {
                    navigate('/admin/temples')
                } else {
                    navigate('/superadmin/temples')
                }

            } else {
                // Handle error, e.g., display a toast message
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update event');
        }
    };




    return (
        <Layout>
            <section>
                <div className="row">
                    <div className="col-md-12">
                        <div className="mb-3">
                            <h3 className='section-heading'>Update Event : {eventName}</h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="eventName">Event Name</label>
                                <input
                                    type="text"
                                    id="eventName"
                                    name="eventName"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    className="form-control"
                                    placeholder="Event Name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="eventDescription">Event Description</label>
                                <textarea
                                    type="text"
                                    id="eventDescription"
                                    name="eventDescription"
                                    value={eventDescription}
                                    onChange={(e) => setEventDescription(e.target.value)}
                                    className="form-control"
                                    placeholder="Event Description"
                                    required
                                />
                            </div>

                            <div className=" mb-3 d-flex">

                                <div style={{ flex: 1 }}>
                                    <label htmlFor="eventStartDate">Event Start Date</label>
                                    <input
                                        type="date"
                                        id="eventStartDate"
                                        name="eventStartDate"
                                        value={eventStartDate}
                                        onChange={(e) => setEventStartDate(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label htmlFor="eventEndDate">Event End Date</label>
                                    <input
                                        type="date"
                                        id="eventEndDate"
                                        name="eventEndDate"
                                        value={eventEndDate}
                                        onChange={(e) => setEventEndDate(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>



                            <div className="mb-3 d-flex">

                                <div style={{ flex: 1 }}>
                                    <label htmlFor="eventStartTime">Event Start Time</label>
                                    <input
                                        type="time"
                                        id="eventStartTime"
                                        name="eventStartTime"
                                        value={eventStartTime}
                                        onChange={(e) => setEventStartTime(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label htmlFor="eventEndTime">Event End Time</label>
                                    <input
                                        type="time"
                                        id="eventEndTime"
                                        name="eventEndTime"
                                        value={eventEndTime}
                                        onChange={(e) => setEventEndTime(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>


                            <div className="mb-3">
                                <button type="submit" className="w-100 btn btn-theme-primary">
                                    Update Event
                                </button>
                            </div>
                        </form>
                    </div>

                </div>





            </section>
        </Layout >
    )
}

export default UpdateEvent