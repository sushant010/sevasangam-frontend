import axios from 'axios';
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv'; // Import CSVLink from react-csv
import HashLoader from "react-spinners/HashLoader";
import SelectComponentWithSearchForTempleName from '../../components/selectComponentWithSearch/SelectComponentWithSearchForTempleName';
import SelectComponentWithSearchForCreator from '../../components/selectComponentWithSearch/selectComponentWithSearchForCreator';
import { set } from 'zod';


const AllDonation = () => {

    const api = import.meta.env.VITE_API_URL;

    const [donations, setDonations] = useState([]);
    const [temples, setTemples] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [templeCreator, setTempleCreator] = useState([]);
    const [file, setFile] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [filters, setFilters] = useState({
        templeName: searchParams.get('templeName') || '',
        payId: searchParams.get('payId') || '',
        templeCreatedBy: searchParams.get('templeCreatedBy') || '',
        donateUser: searchParams.get('donateUser') || '',
        paymentMethod: searchParams.get('paymentMethod') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        dateTo: searchParams.get('dateTo') || ''
    });

    const handleResetFilters = () => {
        setSearchParams(new URLSearchParams());
        fetchAllDonation()
    }

    const fetchAllDonation = async (reset = false) => {
        if (loading || (!hasMore && !reset)) return;


        setLoading(true);
        try {
            const res = await axios.post(`${api}/donation/fetch-all-donation`, {
                count: 10, // Number of donations per page
                skip: reset ? 0 : (page - 1) * 10,
                templeName: searchParams.get('templeName') || '',
                payId: searchParams.get('payId') || '',
                templeCreatedBy: searchParams.get('templeCreatedBy') || '',
                donateUser: searchParams.get('donateUser') || '',
                paymentMethod: searchParams.get('paymentMethod') || '',
                dateFrom: searchParams.get('dateFrom') || '',
                dateTo: searchParams.get('dateTo') || ''
            });
            if (res.data.success) {
                if (reset) {
                    setDonations(res.data.donations);
                    console.log(res.data.donations)

                } else {

                    setDonations(prev => [...prev, ...res.data.donations]);
                }


                setPaymentMethod(Array.from(new Set(donations.methods)));

                setPage(prev => prev + 1);
                setHasMore(res.data.donations.length === 10);
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
        //set search params
        setSearchParams(
            (prevSearchParams) => {
                const newSearchParams = new URLSearchParams(prevSearchParams);
                if (value) {
                    newSearchParams.set(name, value);
                } else {
                    newSearchParams.delete(name);
                }
                return newSearchParams;
            }
        )
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        //fetch inputs from form

        const inputs = e.target.querySelectorAll(
            'input, select'
        );




        const newSearchParams = new URLSearchParams();
        for (const key in filters) {
            if (filters[key]) {
                newSearchParams.set(key, filters[key]);
            }
        }

        inputs.forEach(input => {
            const { name, value } = input;

            newSearchParams.set(name, value);

        });
        setSearchParams(newSearchParams);
    };

    useEffect(() => {



        setFilters({
            templeName: searchParams.get('templeName') || '',
            payId: searchParams.get('payId') || '',
            templeCreatedBy: searchParams.get('templeCreatedBy') || '',
            donateUser: searchParams.get('donateUser') || '',
            paymentMethod: searchParams.get('paymentMethod') || '',
            dateFrom: searchParams.get('dateFrom') || '',
            dateTo: searchParams.get('dateTo') || ''
        });


        //after its set then fetch data

        fetchAllDonation(true);



    }, [searchParams])

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
    const csvData = donations.map((donation, index) => {
        const formattedDate = new Date(donation.date).toLocaleDateString('en-GB');
        const donateUser = donation.donateUser ? JSON.parse(donation.donateUser) : {};
        return {
            SNo: index + 1,
            PaymentId: donation.id,
            Temple: temples.find((temp) => temp._id === donation.temple)?.templeName,
            DateOfDonation: formattedDate,
            DonationByUser: donateUser.name ? `${donateUser.name} (${donateUser.email}, ${donateUser.phone})` : "Anonymous",
            Amount: donation.currency !== 'INR' ? donation.currency : "₹" + donation.amount,
            PaymentMethod: donation.method,
            Certificate: donations.is80CertificateRequested ? (
                donations.certificate ? 'View Certificate' : 'Request Received Again'
            ) : (
                donations.certificate ? 'View Certificate' : 'No request'
            )
        };
    });


    return (
        <Layout>
            <section>

                <div className='d-flex justify-content-between align-items-center'>
                    <div className="section-heading">
                        All Donations
                    </div>
                    <button onClick={handleResetFilters} className="btn btn-theme-primary">Reset filters</button>
                </div>
                {donations.length > 0 ? (
                    <>
                        <div className="filter-container my-4">
                            <form className="row g-4" onSubmit={handleFilterSubmit}>
                                <div className="col-md-2">
                                    <SelectComponentWithSearchForTempleName />

                                </div>
                                <div className="col-md-3">
                                    < SelectComponentWithSearchForCreator templeName={filters.temple} />
                                    {/* <select
                                className="form-select"
                                name="templeCreatedBy"
                                value={filters.templeCreatedBy}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Temple Created By</option>
                                {templeCreator && templeCreator.map((creator, index) => (
                                    <option key={index} value={creator._id}>{creator.name}</option>
                                ))}
                            </select> */}
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
                                            paymentMethod.length > 0 && paymentMethod.map((method, index) => (
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
                                    {donations && donations.length > 0 && donations.map((donation, index) => {
                                        const formattedDate = new Date(donation.date).toLocaleDateString('en-GB');
                                        const donateUser = donation.donateUser ? JSON.parse(donation.donateUser) : {};


                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{donation.razorpay_payment_id}</td>
                                                <td>{temples.find((temp) => temp._id === donation.temple)?.templeName}</td>
                                                <td>{formattedDate}</td>
                                                <td>{donateUser.name ? `${donateUser.name} (${donateUser.email}, ${donateUser.phone})` : "Anonymous"}</td>
                                                <td>{donation.currency !== 'INR' ? donation.currency : "₹"} {donation.amount}</td>
                                                <td>{donation.method}</td>
                                                <td className={donation?.status == 'failed' ? 'text-danger' : 'text-success'}>{donation?.status ? donation?.status?.slice(0, 1).toUpperCase() + donation?.status?.slice(1).toLowerCase() : ""}</td>
                                                <td>{donation.is80CertificateRequested ? (
                                                    donation.certificate ? (
                                                        <div>
                                                            <a
                                                                className="fw-bold"
                                                                style={{ color: "green", textDecoration: "underline" }}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href={donation.certificate}
                                                            >
                                                                View Certificate
                                                            </a>
                                                            <div className="fw-bold text-danger">Request Received Again</div>
                                                        </div>
                                                    ) : (

                                                        <div className="fw-bold text-danger">Request Received</div>
                                                    )
                                                ) : (
                                                    donation.certificate ? (
                                                        <a
                                                            className="fw-bold"
                                                            style={{ color: "green", textDecoration: "underline" }}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            href={donation.certificate}
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
                    </>) : <> {!loading && <>No Donation found</>} </>}
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