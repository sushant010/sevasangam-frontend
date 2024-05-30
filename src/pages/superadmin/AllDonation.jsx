import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const AllDonation = () => {

    const api = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [temples, setTemples] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [templeCreator, setTempleCreator] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [filters, setFilters] = useState({
        temple: searchParams.get('temple') || '',
        payId: searchParams.get('payId') || '',
        templeCreatedBy: searchParams.get('templeCreatedBy') || '',
        donateUser: searchParams.get('donateUser') || '',
        paymentMethod: searchParams.get('paymentMethod') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        dateTo: searchParams.get('dateTo') || ''
    });



    const fetchAllDonation = async (reset = false) => {
        if (loading || (!hasMore && !reset)) return; // Prevent additional fetches if already loading or no more temples

        setLoading(true); // Set loading to true before the API call
        try {
            const res = await axios.post(`${api}/donation/fetch-all-donation`, {
                page: reset ? 1 : page,
                ...filters,
            });
            if (res.data.success) {
                const paymentMethods = res.data.donations.items.map((donation) => donation.method);
                setPaymentMethod([...new Set(paymentMethods)]);
                setDonations((prevDonations) => reset ? res.data.donations.items : [...prevDonations, ...res.data.donations.items]);
                setPage((prevPage) => reset ? 2 : prevPage + 1); // Increment page number for the next fetch
                setHasMore(res.data.donations.items.length > 0); // Set hasMore based on the response

            } else {
                toast.error(res.data.message);
                setHasMore(false); // No more data to load if the response is unsuccessful
            }
        } catch (error) {
            console.error('Error fetching temples:', error);
            setHasMore(false); // Stop trying to fetch if there's an error
        } finally {
            setLoading(false); // Set loading to false after the API call
        }
    };

    // Function to handle scroll event
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
            fetchAllDonation(); // Fetch more temples when scrolled to the bottom
        }
    };

    // Add event listener when component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Remove event listener on unmount
    }, [loading]);

    // Fetch temples when filters or sortOption change
    useEffect(() => {
        fetchAllDonation(true);
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    // const handleSortOption = (option) => {
    //     setSortOption(option);
    // };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const newSearchParams = new URLSearchParams();

        // Check if there are any filter values or sort options
        const hasFilterValues = Object.values(filters).some(value => value);

        if (hasFilterValues) {
            for (const key in filters) {
                if (filters[key]) {
                    newSearchParams.set(key, filters[key]);
                }
            }
            setSearchParams(newSearchParams);
            navigate({
                search: newSearchParams.toString()
            });
        } else {
            // If neither filters nor sort option are set, clear the search parameters
            setSearchParams('');
            navigate({
                search: ''
            });
        }
    };

    const handleRequestCertificate = async (id) => {
        try {
            const res = await axios.get(`${api}/donation/request-80-certificate`,{id});
            
      
            if (res.data.success) {
            toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getUniqueObjects = (array, key) => {
        const uniqueKeys = new Set();
        return array.filter(item => {
            const keyValue = item[key];
            if (!uniqueKeys.has(keyValue)) {
                uniqueKeys.add(keyValue);
                return true;
            }
            return false;
        });
    };
    const fetchAllTemples = async () => {
        try {
            const res = await axios.get(`${api}/temple/get-temples`);
            setTemples(res.data.data.temples);
            const creators = temples.map(temple => temple.createdBy);
            const uniqueCreators = getUniqueObjects(creators, '_id');
            setTempleCreator(uniqueCreators);
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    };



    useEffect(() => {
        fetchAllDonation();
        fetchAllTemples()
    }, []);


    return (
        <Layout>
            <section>

                <div className="section-heading">
                    All Donations
                </div>
                <div className="filter-container my-4">
                    <form className="row g-4" onSubmit={handleFilterSubmit}>
                        <div className="col-md-2">
                            <select
                                className="form-select"
                                name="temple"
                                value={filters.temple}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Temple</option>
                                {
                                    temples.map((temple, index) => (

                                        <option key={index} value={temple._id}>{temple.templeName}</option>
                                    ))
                                }


                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                name="temple"
                                value={filters.templeCreatedBy}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Temple Created By</option>
                                {templeCreator && templeCreator.map((creator, index) => (
                                    <option key={index} value={creator._id}>{creator.name}</option>
                                ))}


                            </select>
                        </div>

                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                name="donateUser"
                                placeholder="Donate User"
                                value={filters.donateUser}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                name="payId"
                                placeholder="Payment Id"
                                value={filters.payId}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="col-md-2">
                            <select
                                className="form-select"
                                name="paymentMethod"
                                value={filters.paymentMethod}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Payment Method</option>
                                {
                                    paymentMethod.map((method, index) => (

                                        <option key={index} value={method}>{method}</option>
                                    ))
                                }

                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className='mx-2'>Date From</label>
                            <input
                                type="date"
                                className="form-control"
                                name="dateFrom"
                                placeholder="Date From"
                                value={filters.dateFrom}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className='mx-2'>Date To</label>
                            <input
                                type="date"
                                className="form-control"
                                name="dateTo"
                                placeholder="Date To"
                                value={filters.dateTo}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-1">
                            <div className="d-flex justify-content-end m-0 p-0">
                                <button type="submit" className="btn btn-theme-primary"><i className="fa-solid fa-filter"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="table-responsive">
                    <table className="table table-light table-bordered table-striped">
                        <thead>
                            <tr>
                                <td ><p className='fw-bold text-primary'>S. No</p></td>
                                <td ><p className='fw-bold text-primary'>Payment Id</p></td>
                                <td ><p className='fw-bold text-primary'>Temple</p></td>

                                <td ><p className='fw-bold text-primary'>Date of Donation</p></td>
                                <td ><p className='fw-bold text-primary'>Donation by User</p></td>
                                <td ><p className='fw-bold text-primary'>Amount</p></td>
                                <td ><p className='fw-bold text-primary'>Payment Method</p></td>
                                <td ><p className='fw-bold text-primary'>Transaction Id</p></td>

                            </tr>
                        </thead>
                        <tbody>


                            {donations && donations.map((donation, index) => {

                                const formattedDate = new Date(donation.created_at * 1000).toLocaleDateString('en-US');
                                const donateUser = donation.notes.donateUser ? JSON.parse(donation.notes.donateUser) : [];
                

                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{donation.id}</td>
                                        <td>{temples.find((temp) => temp._id === donation.notes.temple)?.templeName}</td>

                                        <td>{formattedDate}</td>
                                        {donateUser !== null ? <td>{`${donateUser.name} (${donateUser.email}, ${donateUser.phone}) `}</td> : <td>Anonymous</td>}
                                        <td>{donation.currency !== 'INR' ? donation.currency : "₹"} {donation.amount}</td>
                                        <td>{donation.method}</td>
                                        <td>
                                        <button onClick={()=>handleRequestCertificate(donation.id)} className='btn btn-theme-primary' title="View Temple">
                                            Request 80 Certificate
                                        </button>
                                            {/* <button className='btn btn-theme-primary' title="View Temple">
                                                Download Receipt
                                            </button> */}
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>

            </section >

        </Layout >
    )
}

export default AllDonation