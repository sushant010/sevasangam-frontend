import React, { useEffect, useState } from 'react';
import Tabs from '../../components/tabs/Tabs';
import Layout from '../../components/layout/Layout';
import { useDonate } from '../../context/Donate';
import axios from 'axios';
import './checkout.css';
import { Link } from 'react-router-dom';
import defaultLogo from '../../assets/images/sevasangam-logo.jpg';
import { useAuth } from '../../context/Auth';

const Checkout = () => {
    const api = import.meta.env.VITE_API_URL;
    const [donate, setDonate] = useDonate();
    const [temple, setTemple] = useState({});
    const [auth] = useAuth();


    const [donateUser, setDonateUser] = useState({ name: auth.user.name, email: auth.user.email, phone: auth.user.phone });

    const [selectedPercentage, setSelectedPercentage] = useState('');
    const [customPercentage, setCustomPercentage] = useState('');

    const handleSelectChange = (event) => {
        setSelectedPercentage(event.target.value);
        if (event.target.value !== 'other') {
            setCustomPercentage('');
        }
    };

    const handleDonateUserChange = (e) => {
        setDonateUser({ ...donateUser, [e.target.name]: e.target.value });
    }

    const handleCustomChange = (event) => {
        setCustomPercentage(event.target.value);
    };



    const fetchTemple = async () => {
        try {
            const res = await axios.get(`${api}/temple/get-temple/${donate.templeId}`);
            const { data } = res.data;
            setTemple(data);
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    };

    const handleDonate = async (e) => {
        // setDonate({ ...donate, amount: amount, templeId: temple._id })
        const test = localStorage.getItem('donate')
        alert(test.amount)
        e.preventDefault()
        // const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")
        const { data: { order } } = await axios.post(`${api}/donation/checkout`, { amount })

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: amount * 100,
            currency: "INR",
            name: "Seva Sangam",
            description: `Donation for ${temple.templeName}`,
            image: defaultLogo,
            order_id: order.id,
            callback_url: `${api}/donation/payment-verification`,
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "var(--color-primary-color)"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    const [amount, setAmount] = useState('')

    const handleAddtoDonation = (e) => {
        const addedAmount = parseInt(e.target.textContent.replace(/[^\d]/g, '')); // Extract only the numeric value
        setDonate((prevDonate) => ({
            ...prevDonate,
            amount: prevDonate.amount + addedAmount,
            templeId: temple._id
        }));
    }

    const handleUpdateDonation = (e) => {
        setDonate({ ...donate, amount: e.target.value, templeId: temple._id })
        localStorage.setItem('donate', JSON.stringify({ amount: e.target.value, templeId: temple._id }))
    }

    useEffect(() => {
        fetchTemple();
    }, []);

    return (
        <Layout>
            <section>
                <Tabs />
                <div className='donate-once'>
                    <div className="row">
                        <div className="col-md-4">
                            <h3 style={{ fontSize: "20px" }} className='section-heading'>Add on Donation Amount</h3>
                            <div className='temple-donation' style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" }}>
                                <div style={{ gap: "10px" }} className='mt-2 my-4 d-flex flex-wrap align-items-center'>
                                    <span onClick={handleAddtoDonation} className='amount'>+ 500</span> <span onClick={handleAddtoDonation} className='amount'>+ 1000</span> <span onClick={handleAddtoDonation} className='amount'>+ 1500</span><span onClick={handleAddtoDonation} className='amount'>+ 2000</span>
                                    <input style={{ fontSize: "14px", flex: "1", padding: "4px", width: "150px", height: "35px" }} placeholder='Enter Amount' className='form-control' />
                                </div>
                                <input onChange={handleUpdateDonation} value={donate.amount} style={{ fontSize: "14px", flex: "1", padding: "4px", width: "100%", height: "40px" }} placeholder='Enter Amount' className='mb-4 form-control' />

                                <div style={{ background: "#eee", padding: ' 10px ', borderRadius: "8px" }}>
                                    <div style={{ borderRadius: "8px", overflow: "hidden", width: "100%", height: '400px' }} className="img-wrapper">
                                        <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src="https://plus.unsplash.com/premium_photo-1664304050409-46e1d1d195f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVtcGxlc3xlbnwwfHwwfHx8MA%3D%3D" alt="temple" />
                                    </div>
                                    <h3 style={{ fontSize: "20px" }} className='mt-2 section-heading'>{temple.templeName}</h3>
                                    <p className='my-2'>{temple.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className='mb-4 p-2' style={{ background: "#f5f5f5", padding: ' 10px ', borderRadius: "8px" }}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div style={{ borderRadius: "8px", overflow: "hidden", width: "160px", height: '100%' }} className="img-wrapper">
                                        <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={defaultLogo} alt="temple" />
                                    </div>
                                    <div className='p-3'>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt accusantium asperiores placeat culpa optio repudiandae esse enim ducimus dicta voluptatum.</p>
                                        <p className='mt-1 fw-bold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt accusantium asperiores placeat culpa optio repudiandae esse enim ducimus dicta voluptatum.</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p>Support us by:</p>
                                    <div>
                                        <select
                                            value={selectedPercentage}
                                            onChange={handleSelectChange}
                                            className="form-select"
                                            style={{ marginRight: '10px', width: '160px', backgroundColor: "#fff", fontSize: "13.5px" }}
                                        >
                                            <option value="16">16% (₹ {Math.round(donate.amount * 0.16)})</option>
                                            <option value="14">14% (₹ {Math.round(donate.amount * 0.14)})</option>
                                            <option value="12">12% (₹ {Math.round(donate.amount * 0.12)})</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {selectedPercentage === 'other' && (
                                            <input
                                                type="number"
                                                value={customPercentage}
                                                onChange={handleCustomChange}
                                                placeholder="Enter percentage"
                                                className="form-control"
                                                style={{ fontSize: "13.5px", width: '160px', display: 'inline-block' }}
                                            />
                                        )}
                                    </div>
                                </div>
                                {selectedPercentage == 'other' && customPercentage == 0 && (
                                    <div className='contribution'>
                                        <p className='mt-2 fw-bold'>By supporting Us, you are helping us reach out to more campaigns like this and scale our impact.</p>
                                        <div className='d-flex align-items-center' style={{ gap: "16px" }}>
                                            <div>Deduct 7% towards covering Sevasangams expenses (optional)</div>
                                            <div className="form-check d-flex justify-content-center align-items-center">
                                                <input defaultChecked className="form-check-input custom-checkbox" type="checkbox" id="flexCheckDefault1" />
                                                <label style={{ fontSize: "13.5px", color: "darkgrey" }} className="form-check-label" htmlFor="flexCheckDefault1"></label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{ background: "#f5f5f5", padding: ' 10px ', borderRadius: "8px" }}>
                                <form>
                                    <h3 style={{ fontSize: "20px" }} className='mb-2 section-heading'>Please fill your Details</h3>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <input value={donateUser.name} style={{ background: "#fff", fontSize: "14px" }} type="text" className="form-control" name='name' onChange={handleDonateUserChange} id="name" placeholder="Name" />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <input onChange={handleDonateUserChange} value={donateUser.email} style={{ background: "#fff", fontSize: "14px" }} name="email" type="email" className="form-control" id="email" placeholder="Email ID" />
                                            </div>
                                        </div>
                                        <div className="col-md-4">

                                            <div className="form-group mb-3">
                                                <input onChange={handleDonateUserChange} value={donateUser.phone} style={{ background: "#fff", fontSize: "14px" }} name="phone" type="text" className="form-control" id="phone" placeholder="Mobile" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div style={{ gap: "16px" }} className='d-flex align-items-center justify-content-center'>
                                    <div className="form-check d-flex justify-content-center align-items-center">
                                        <input className="form-check-input custom-checkbox" type="checkbox" id="flexCheckDefault2" />
                                        <label style={{ fontSize: "13.5px", color: "darkgrey" }} className="form-check-label" htmlFor="flexCheckDefault2">
                                            Make my donations anonymous
                                        </label>
                                    </div>
                                    <div className="form-check d-flex justify-content-center align-items-center">
                                        <input className="form-check-input custom-checkbox" type="checkbox" id="flexCheckDefault3" />
                                        <label style={{ fontSize: "13.5px", color: "darkgrey" }} className="form-check-label" htmlFor="flexCheckDefault3">
                                            I want to receive donation updates on Whatsapp <i className="fa fa-whatsapp" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <p style={{ fontSize: "13.5px", color: "darkgrey" }} className='mt-4 text-center'>By Continuing you are agreeing to <Link to='/terms-and-conditions'>Terms</Link> of use and <Link to='/privacy-policy'>Privacy Policy</Link></p>
                            <button onClick={handleDonate} className='btn btn-theme-primary m-3 w-100'>Checkout (₹ {donate.amount})</button>
                        </div>
                    </div>
                </div>
                <div className="donate-monthly d-none">
                    Donate monthly
                </div>
            </section>
        </Layout>
    );
};

export default Checkout;
