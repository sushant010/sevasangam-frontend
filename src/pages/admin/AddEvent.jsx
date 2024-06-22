import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import compress from 'compress-base64'

const AddEvent = () => {


    const { id } = useParams();
    const api = import.meta.env.VITE_API_URL;

    const [temple, setTemple] = useState({});
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [events, setEvents] = useState([]);
    const [eventImages, setEventImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState(
        []
    );


    useEffect(() => {
        fetchTemple();

        if (temple) {
            fetchEventsOfTemple();
        }

    }, []);


    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = event => {
                compress(event.target.result,

                    {
                        width: 800, // Increased width for better details
                        type: 'image/jpeg',
                        max: 1000, // Increased max size to allow for higher quality
                        min: 100,  // Decreased min size to allow for smaller file sizes
                        quality: 0.95, // Adjusted quality to improve image fidelity
                    },
                    {
                        width: 800, // Increased width for better details
                        type: 'image/png',
                        max: 1000, // Increased max size to allow for higher quality
                        min: 100,  // Decreased min size to allow for smaller file sizes
                        quality: 0.95, // Adjusted quality to improve image fidelity
                    },
                    {
                        width: 800, // Increased width for better details
                        type: 'image/webp',
                        max: 1000, // Increased max size to allow for higher quality
                        min: 100,  // Decreased min size to allow for smaller file sizes
                        quality: 0.95, // Adjusted quality to improve image fidelity
                    },
                ).then(result => {
                    resolve(result);
                }).catch(error => {
                    reject(error);
                });
            };
            fileReader.readAsDataURL(file);
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }



    const handleFileUpload = async (e) => {

        const selectedFiles = Array.from(e.target.files);
        try {
            setImagePreviews(selectedFiles.map(file => URL.createObjectURL(file)));
            const compressedImages = await Promise.all(selectedFiles.map(file => convertToBase64(file)));

            setEventImages(compressedImages);
            console.log("done")


        } catch (error) {
            console.log(error);
        }
    };


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


    const fetchEventsOfTemple = async () => {
        try {
            const res = await axios.post(`${api}/temple/event/get-all-events-by-temple/${id}`);
            const { data } = res.data;
            setEvents(data);
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
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
                images: eventImages,
            };

            const res = await axios.post(`${api}/temple/event/create-event`, newEventData);
            if (res.data.success) {
                fetchEventsOfTemple(); // Refresh the events list
                // Clear form fields
                setEventName('');
                setEventDescription('');
                setEventStartDate('');
                setEventEndDate('');
                setEventStartTime('');
                setEventEndTime('');
                setEventImages([]);
                // Optionally, display success message
            } else {
                // Handle error, e.g., display a toast message
            }
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    };




    return (
        <Layout>
            <section>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <h3 className='section-heading'>Add Upcoming Events for {temple.templeName}</h3>
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
                            <div style={{ background: "var(--color-theme-accent)", padding: "10px", borderRadius: "4px" }} className="mb-3">
                                <label htmlFor="eventImages" className="form-label">Event Images <i className="fa fa-asterisk"></i></label>
                                <input
                                    type="file"
                                    name="eventImages"
                                    onChange={handleFileUpload}
                                    className="form-control"
                                    id="eventImages"
                                    multiple
                                    accept="image/*"
                                />
                                {imagePreviews.map((src, index) => (
                                    <img key={index} src={src} alt={`Image Preview ${index}`} className="mt-2 me-2" style={{ height: '80px', aspectRatio: '1/1', objectFit: "cover", border: "3px solid #fff" }} />
                                ))}
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="w-100 btn btn-theme-primary">
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <h4 className='section-heading'>Upcoming Events</h4>
                            {events.length > 0 ? (
                                <div>
                                    {events.map((event, index) => (
                                        <div key={index} className="card mb-3 w-100">
                                            <div className="card-body">
                                                <h5 className="text-primary card-title">{event.name}</h5>
                                                <div style={{ width: "100%", height: "300px" }}>
                                                    <img style={{ objectFit: "cover", width: "100%", height: "100%" }} src={event.images.length > 0 ? event.images[0] : "https://plus.unsplash.com/premium_photo-1678294329028-58d80618cac6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                                                </div>

                                                <p className="card-text mt-2"><strong>Temple : </strong>{event.temple.templeName}</p>
                                                <p className="card-text"><strong>Description : </strong>{event.description.length < 200 ? event.description : event.description.slice(0, 200) + "..."}</p>
                                                <p className="card-text">
                                                    <strong>Date:</strong> {new Date(event.date.start).toLocaleDateString()} - {new Date(event.date.end).toLocaleDateString()} <br />

                                                </p>
                                                <p className="card-text">
                                                    <strong>Time:</strong> {event.timing.start} - {event.timing.end}<br />

                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No upcoming events.</p>
                            )}
                        </div>
                    </div>
                </div>





            </section>
        </Layout >
    )
}

export default AddEvent