
import PropTypes from 'prop-types';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventCard = ({ event, showActions = false, handleDeleteEvent }) => {

    const [auth] = useAuth()
    const navigate = useNavigate();

    const api = import.meta.env.VITE_API_URL;

    const handleUpdateEvent = (id) => {
        window.scrollTo(0, 0);
        auth?.user?.role == 1 ?
            navigate(`/admin/update-event/${id}`) :
            navigate(`/superadmin/update-event/${id}`);
    }

    const handleViewEvent = (templeId, eventId) => {
        window.scrollTo(0, 0);
        navigate(`/temple/${templeId}/${eventId}`);
    }

    return (
        <div onClick={() => !showActions && handleViewEvent(event.temple._id, event._id)} style={{ margin: "10px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: " rgba(0, 0, 0, 0.1) 0px 4px 12px" }} className="card-body d-flex flex-column">
            <h5 className="text-primary card-title">{event.name}</h5>
            <div style={{ width: "100%", height: "300px" }}>
                <img style={{ objectFit: "cover", width: "100%", height: "100%" }} src={event.images.length > 0 ? event.images[0] : "https://plus.unsplash.com/premium_photo-1678294329028-58d80618cac6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
            </div>

            <p className="card-text mt-2"><strong>Temple : </strong>{event.temple.templeName}</p>
            <p style={{ flex: 1 }} className="card-text"><strong>Description : </strong>{event.description.length < 100 ? event.description : event.description.slice(0, 100) + "..."}</p>
            <p className="card-text">
                <strong>Date:</strong> {new Date(event.date.start).toLocaleDateString()} - {new Date(event.date.end).toLocaleDateString()} <br />

            </p>
            <p className="card-text">
                <strong>Time:</strong> {event.timing.start} - {event.timing.end}<br />

            </p>

            <div className="card-text">
                {
                    ((auth?.user?.role == 1 || auth?.user?.role == 2) && showActions) && (
                        <>
                            <hr className='my-1'></hr>
                            <div className='d-flex' style={{ gap: "8px" }}>
                                <p>  Actions : </p>
                                <button
                                    title="View Temple"
                                    onClick={() => handleViewEvent(event.temple._id, event._id)}

                                >
                                    <i
                                        className="fa-solid fa-eye"
                                        style={{ color: "var(--color-theme-primary)" }}
                                    ></i>
                                </button>
                                <button
                                    title="Update Temple"
                                    onClick={(e) => handleUpdateEvent(event._id)}

                                >
                                    <i
                                        className="fa-solid fa-pen-to-square"
                                        style={{ color: "var(--color-theme-primary)" }}
                                    ></i>
                                </button>
                                {auth?.user?.role == 2 ? (<button title="Delete Temple"
                                    onClick={(e) => handleDeleteEvent}

                                >
                                    <i
                                        className="fa-solid fa-trash-can"
                                        style={{ color: "#D83F31" }}
                                    ></i>
                                </button>) : null}
                            </div>
                        </>
                    )
                }
            </div>

        </div>
    )
}
EventCard.propTypes = {
    event: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        temple: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            templeName: PropTypes.string.isRequired,
        }).isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.shape({
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired
        }).isRequired,
        timing: PropTypes.shape({
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    showActions: PropTypes.bool,
    handleDeleteEvent: PropTypes.func
};

export default EventCard