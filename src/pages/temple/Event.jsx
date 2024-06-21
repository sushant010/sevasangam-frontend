import './event.css'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Event = () => {

    const api = import.meta.env.VITE_API_URL;
    const { id, eventId } = useParams();
    const [event, setEvent] = useState({});
    const [temple, setTemple] = useState({});


    const fetchEvent = async () => {
        try {
            const response = await axios.get(`${api}/temple/event/fetch-event/${eventId}`);
            if (response.data.success) {
                setEvent(response.data.event);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const fetchTemple = async () => {
        try {
            const res = await axios.get(`${api}/temple/get-temple/${id}`);
            const { data } = res.data;
            console.log("templeeee ")
            console.log(data);
            setTemple(data);
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    };

    useEffect(() => {
        fetchEvent();
        fetchTemple()
        console.log(event)
    }
        , []);

    return (
        <Layout>
            <section>
                <h1 className="section-heading">
                    {event.name}
                </h1>
                <div className="row">
                    <div className="col-md-5">
                        <div className="event-details">
                            <p className='text-primary'><strong>Temple:</strong> {temple.templeName}</p>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>Start Date:</strong> {formatDate(event.date?.start)}</p>
                            <p><strong>End Date:</strong> {formatDate(event.date?.end)}</p>
                            <p><strong>Timing:</strong> {event.timing?.start} - {event.timing?.end}</p>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="d-flex justify-content-end">

                            {event.images && event.images.length > 0 &&
                                event.images.map((image, index) => (
                                    <div key={index} className="">
                                        <div style={{ height: "300px", aspectRatio: "1/1" }} className="event-images">
                                            <img style={{ objectFit: "cover" }} src={image} alt={`Event Image ${index + 1}`} />
                                        </div>
                                    </div>
                                ))


                            }

                        </div>

                    </div>
                </div>




            </section>


        </Layout>
    )
}

export default Event