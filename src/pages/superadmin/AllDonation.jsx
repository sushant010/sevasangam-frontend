import axios from 'axios';
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv'; // Import CSVLink from react-csv
import HashLoader from "react-spinners/HashLoader";


const AllDonation = () => {

    const api = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const [razorpayDonations, setRazorpayDonations] = useState([]);
    const [donations, setDonations] = useState([]);
    const [temples, setTemples] = useState([]);
    const [paymentMethod] = useState([]);
    const [templeCreator, setTempleCreator] = useState([]);
    const [file, setFile] = useState(null);

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
        if (loading || (!hasMore && !reset)) return;

        setLoading(true);
        try {
            const res = await axios.post(`${api}/donation/fetch-all-donation`, {
                count: 10, // Number of donations per page
                skip: reset ? 0 : (page - 1) * 10,
                ...filters,
            });
            if (res.data.success) {
                if (reset) {
                    console.log(res.data.razorpayDonations)
                    setRazorpayDonations(res.data.razorpayDonations);
                    setDonations(res.data.donations);
                } else {
                    setRazorpayDonations(prev => [...prev, ...res.data.razorpayDonations]);
                    setDonations(prev => [...prev, ...res.data.donations]);
                }
                setPage(prev => prev + 1);
                setHasMore(res.data.razorpayDonations.length === 10);
            } else {
                toast.error(res.data.message);
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching donations:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
            fetchAllDonation();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

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

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const newSearchParams = new URLSearchParams();
        for (const key in filters) {
            if (filters[key]) {
                newSearchParams.set(key, filters[key]);
            }
        }
        setSearchParams(newSearchParams);
        navigate({
            search: newSearchParams.toString()
        });
        fetchAllDonation(true);
    };

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
            const creators = res.data.data.temples.map(temple => temple.createdBy);
            const uniqueCreators = getUniqueObjects(creators, '_id');
            setTempleCreator(uniqueCreators);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            await fetchAllDonation(true);
            await fetchAllTemples();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload80GCertificate = async (id) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('certificate', file);
        formData.append('id', id);

        try {
            const res = await axios.post(`${api}/donation/upload-80-certificate`, formData);
            if (res.data.success) {
                toast.success(res.data.message);
                fetchAllDonation(true);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error uploading certificate:', error);
            toast.error('Failed to upload certificate');
        }
    };

    // Prepare CSV data
    const csvData = razorpayDonations.map((donation, index) => {
        const formattedDate = new Date(donation.created_at * 1000).toLocaleDateString('en-US');
        const donateUser = donation.notes.donateUser ? JSON.parse(donation.notes.donateUser) : {};
        const customDonation = donations.find((don) => don.razorpay_payment_id === donation.id) || {};
        return {
            SNo: index + 1,
            PaymentId: donation.id,
            Temple: temples.find((temp) => temp._id === donation.notes.temple)?.templeName,
            DateOfDonation: formattedDate,
            DonationByUser: donateUser.name ? `${donateUser.name} (${donateUser.email}, ${donateUser.phone})` : "Anonymous",
            Amount: donation.currency !== 'INR' ? donation.currency : "₹" + donation.amount,
            PaymentMethod: donation.method,
            Certificate: customDonation.is80CertificateRequested ? (
                customDonation.certificate ? 'View Certificate' : 'Request Received Again'
            ) : (
                customDonation.certificate ? 'View Certificate' : 'No request'
            )
        };
    });

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
                                name="templeCreatedBy"
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
                <div className="d-flex justify-content-end">
                    <CSVLink
                        data={csvData}
                        filename={"donations.csv"}
                        className="btn btn-theme-primary mb-3"
                    >
                        <i className="fa-solid fa-file-excel"></i> Download as CSV
                    </CSVLink>
                </div>

                <div className="table-responsive">
                    <table id="donationsTable" className="table table-light table-bordered table-striped">
                        <thead>
                            <tr>
                                <td><p className='fw-bold text-primary'>S. No</p></td>
                                <td><p className='fw-bold text-primary'>Payment Id</p></td>
                                <td><p className='fw-bold text-primary'>Temple</p></td>
                                <td><p className='fw-bold text-primary'>Date of Donation</p></td>
                                <td><p className='fw-bold text-primary'>Donation by User</p></td>
                                <td><p className='fw-bold text-primary'>Amount</p></td>
                                <td><p className='fw-bold text-primary'>Payment Method</p></td>
                                <td><p className='fw-bold text-primary'>Payment Status</p></td>
                                <td><p className='fw-bold text-primary'>80G Certificate</p></td>
                            </tr>
                        </thead>
                        <tbody>
                            {razorpayDonations && razorpayDonations.length > 0 && razorpayDonations.map((donation, index) => {
                                const formattedDate = new Date(donation.created_at * 1000).toLocaleDateString('en-GB');
                                const donateUser = donation.notes.donateUser ? JSON.parse(donation.notes.donateUser) : {};
                                const customDonation =
                                    donations.find(
                                        (don) => don.razorpay_payment_id === donation.id
                                    ) || {};

                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{donation.id}</td>
                                        <td>{temples.find((temp) => temp._id === donation.notes.temple)?.templeName}</td>
                                        <td>{formattedDate}</td>
                                        <td>{donateUser.name ? `${donateUser.name} (${donateUser.email}, ${donateUser.phone})` : "Anonymous"}</td>
                                        <td>{donation.currency !== 'INR' ? donation.currency : "₹"} {donation.amount}</td>
                                        <td>{donation.method}</td>
                                        <td className={donation.status == 'failed' ? 'text-danger' : 'text-success'}>{donation.status.slice(0, 1).toUpperCase() + donation.status.slice(1).toLowerCase()}</td>
                                        <td>{customDonation.is80CertificateRequested ? (
                                            customDonation.certificate ? (
                                                <div>
                                                    <a
                                                        className="fw-bold"
                                                        style={{ color: "green", textDecoration: "underline" }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={customDonation.certificate}
                                                    >
                                                        View Certificate
                                                    </a>
                                                    <div className="fw-bold text-danger">Request Received Again</div>
                                                </div>
                                            ) : (
                                                // <div>
                                                //     <input type="file" onChange={handleFileChange} />
                                                //     <button onClick={() => handleUpload80GCertificate(customDonation._id)}>Upload</button>
                                                // </div>
                                                <div className="fw-bold text-danger">Request Received</div>
                                            )
                                        ) : (
                                            customDonation.certificate ? (
                                                <a
                                                    className="fw-bold"
                                                    style={{ color: "green", textDecoration: "underline" }}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={customDonation.certificate}
                                                >
                                                    View Certificate
                                                </a>
                                            ) : (
                                                "No request"
                                            )
                                        )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
            {loading && (
                <section className="d-flex m-auto">
                    <HashLoader color={"#ff395c"} />
                </section>
            )}

        </Layout>
    );
};

export default AllDonation;