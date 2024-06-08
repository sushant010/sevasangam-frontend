import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import defaultLogo from '../../assets/images/sevasangam-logo.png';
import { useAuth } from '../../context/Auth';
import Carousel from "react-grid-carousel";
import { toast } from 'react-toastify';

const ViewTemple = () => {


    const initialState = {
        templeName: '',
        typeOfOrganization: '',
        description: '',
        createdBy: '',
        contactPerson: {
            name: '',
            email: '',
            mobile: ''
        },
        location: {
            address: '',
            country: ''
        },
        images: {
            logo: '',
            bannerImage: [],
            templeImages: []
        },
        bankDetails: {
            bankName: '',
            branch: '',
            accountHolderName: '',
            accountNumber: '',
            ifscCode: '',
            routingNumber: '',
            swiftBicCode: ''
        },
        taxInformation: {
            taxId: '',
            ein: ''
        },
        website: '',
        socialMedia: {
            facebook: '',
            twitter: '',
            instagram: ''
        },
        upcomingEvents: []
    };

    const [auth] = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const api = import.meta.env.VITE_API_URL;
    const [temple, setTemple] = useState(initialState);
    const [events, setEvents] = useState([]);





    const handleUpdateTemple = (id) => {
        window.scrollTo(0, 0);
        navigate(`/admin/update-temple/${id}`)



    }

    const handleUpdateEvent = (id) => {
        window.scrollTo(0, 0);
        auth?.user?.role == 1 ?
            navigate(`/admin/update-event/${id}`) :
            navigate(`/superadmin/update-event/${id}`);
    }



    const handleDeleteEvent = (id) => {
        axios.delete(`${api}/temple/event/delete-event/${id}`)
            .then(res => {
                if (res.data.success) {
                    setEvents(events.filter(event => event._id !== id));
                    toast.success(res.data.message);
                }
            })
            .catch(err => console.error(err));
    }



    const fetchTemple = async () => {
        try {
            const res = await axios.get(`${api}/temple/get-temple/${id}`);
            const { data } = res.data;
            console.log(data)
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

    useEffect(() => {


        fetchTemple();
        fetchEventsOfTemple();
    }, []);



    return (
        <Layout>
            <section>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="section-heading  ">Name : {temple.templeName}</h1>
                        <h2 className='text-grey-dark  my-3 fw-bold'>Location : {temple.location.address}</h2>
                    </div>
                    <div className='col-md-8'>

                        <div className="table-responsive">
                            <table className="table table-light table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td colSpan="2 "><p className='fw-bold text-primary'>Basic</p></td>

                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Type of Organization</td>
                                        <td>{temple.typeOfOrganization}</td>
                                    </tr>
                                    <tr>
                                        <td>Donation</td>
                                        <td>{temple.donation}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>{temple.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact Person</td>
                                        <td>{temple.contactPerson.name} ({temple.contactPerson.email}, {temple.contactPerson.mobile})</td>
                                    </tr>
                                    <tr>
                                        <td>Location</td>
                                        <td>{temple.location.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Logo</td>
                                        <td><img src={temple?.images?.logo ? temple?.images?.logo : defaultLogo} alt="Temple Logo" style={{ maxWidth: '100px' }} /></td>
                                    </tr>
                                    <tr>
                                        <td>Actions</td>
                                        <td className="listing-donation text-grey-dark text-sm">

                                            <button
                                                title="Update Temple"
                                                onClick={() => handleUpdateTemple(temple._id)}

                                            >
                                                <i
                                                    className="fa-solid fa-pen-to-square"
                                                    style={{ color: "var(--color-theme-primary)" }}
                                                ></i>
                                            </button>
                                            {auth?.user?.role == 2 ? (<button title="Delete Temple"
                                                onClick={() => handleDeleteTemple(temple._id)}

                                            >
                                                <i
                                                    className="fa-solid fa-trash-can"
                                                    style={{ color: "#D83F31" }}
                                                ></i>
                                            </button>) : null}

                                        </td>
                                    </tr>

                                    {/* <tr>
                            <td>Upcoming Events</td>
                            <td>
                                <ul>
                                    {temple.upcomingEvents.map((event, index) => (
                                        <li key={index}>{event}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr> */}
                                    {/* <tr>
                            <td>Temple Banner Images</td>
                            <td>
                                {temple.images.bannerImage.map((image, index) => (
                                    <img key={index} src={image} alt={`Temple Banner ${index + 1}`} style={{ maxWidth: '100px', marginRight: '10px' }} />
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td>Temple Images</td>
                            <td>
                                {temple.images.templeImages.map((image, index) => (
                                    <img key={index} src={image} alt={`Temple Image ${index + 1}`} style={{ maxWidth: '100px', marginRight: '10px' }} />
                                ))}
                            </td>
                        </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-4  mb-4 ">
                        <div title="Banner Image" className='' style={{ width: "auto", height: '100%', border: '' }}>
                            <img src={temple.images.bannerImage !== null ? temple.images.bannerImage : "https://images.unsplash.com/photo-1564804955013-e02ad9516982?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Temple Banner" style={{ width: '100%', height: '100%', objectFit: "cover" }} />

                        </div>
                    </div>

                </div>

                <div className="row">




                    <div className="col-md-6">
                        <table className="table table-light table-bordered table-striped">
                            <thead>
                                <tr>
                                    <td colSpan="2 "><p className='fw-bold text-primary'>Bank Details</p></td>

                                </tr>
                            </thead>
                            <tbody>


                                <tr>
                                    <td>Bank Name</td>
                                    <td>{temple.bankDetails.bankName}</td>
                                </tr>
                                <tr>
                                    <td>Branch</td>
                                    <td>{temple.bankDetails.branch}</td>
                                </tr>
                                <tr>
                                    <td>Account Holder Name</td>
                                    <td>{temple.bankDetails.accountHolderName}</td>
                                </tr>
                                <tr>
                                    <td>Account Number</td>
                                    <td>{temple.bankDetails.accountNumber}</td>
                                </tr>
                                <tr>
                                    <td>IFSC Code</td>
                                    <td>{temple.bankDetails.ifscCode}</td>
                                </tr>
                                <tr>
                                    <td>Routing Number</td>
                                    <td>{temple.bankDetails.routingNumber}</td>
                                </tr>
                                <tr>
                                    <td>Swift/BIC Code</td>
                                    <td>{temple.bankDetails.swiftBicCode}</td>
                                </tr>
                                <tr>
                                    <td>Tax ID</td>
                                    <td>{temple.taxInformation.taxId}</td>
                                </tr>
                                <tr>
                                    <td>EIN</td>
                                    <td>{temple.taxInformation.ein}</td>
                                </tr>


                            </tbody>
                        </table>

                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-light table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <td colSpan="2 "><p className='fw-bold text-primary'>Contact Person</p></td>

                                            </tr>
                                        </thead>
                                        <tbody>


                                            <tr>
                                                <td>Name</td>
                                                <td>{temple.contactPerson.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{temple.contactPerson.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Mobile</td>
                                                <td>{temple.contactPerson.mobile}</td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-light table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <td colSpan="2 "><p className='fw-bold text-primary'>Social</p></td>

                                            </tr>
                                        </thead>
                                        <tbody>


                                            <tr>
                                                <td>Website</td>
                                                <td><a href={temple.website}>{temple.website}</a></td>
                                            </tr>
                                            <tr>
                                                <td>Facebook</td>
                                                <td><a href={temple.socialMedia.facebook}>{temple.socialMedia.facebook}</a></td>
                                            </tr>
                                            <tr>
                                                <td>Twitter</td>
                                                <td><a href={temple.socialMedia.twitter}>{temple.socialMedia.twitter}</a></td>
                                            </tr>
                                            <tr>
                                                <td>Instagram</td>
                                                <td><a href={temple.socialMedia.instagram}>{temple.socialMedia.instagram}</a></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="col-md-12">
                        {events.length > 0 ? (
                            <div className="row">
                                <div className="col-md-12">
                                    <div style={{ fontSize: "34px" }} className="section-heading line my-3">Upcoming Events</div>
                                </div>
                                <Carousel cols={3} rows={1} gap={20} loop>
                                    {events && events.map((event, index) => (


                                        <Carousel.Item key={index}>
                                            <div style={{ margin: "10px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: " rgba(0, 0, 0, 0.1) 0px 4px 12px" }} key={index} className="card-body d-flex flex-column">
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
                                                <p className="card-text">
                                                    <strong>Actions:</strong>    <button className='mx-2'
                                                        title="Update Event"
                                                        onClick={() => handleUpdateEvent(event._id)}

                                                    >
                                                        <i
                                                            className="fa-solid fa-pen-to-square"
                                                            style={{ color: "var(--color-theme-primary)" }}
                                                        ></i>
                                                    </button>
                                                    <button className='mx-2' title="Delete Event"
                                                        onClick={() => handleDeleteEvent(event._id)}

                                                    >
                                                        <i
                                                            className="fa-solid fa-trash-can"
                                                            style={{ color: "#D83F31" }}
                                                        ></i>
                                                    </button>

                                                </p>


                                            </div>
                                        </Carousel.Item>

                                    ))}

                                    {/* {similarTemple.length > 8
                      && (
                        <Carousel.Item >
                          <div className="h-100 d-flex justify-content-center align-items-center flex-column">


                            <button onClick={handleViewAllSimilarTemples} className="btn btn-theme-primary">View All Similar Temples</button>
                          </div>
                        </Carousel.Item>
                      )} */}


                                </Carousel>

                            </div>
                        ) : null}
                    </div>



                </div>








            </section>
        </Layout>
    );
}

export default ViewTemple;
