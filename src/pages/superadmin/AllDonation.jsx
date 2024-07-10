import axios from 'axios';
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv'; // Import CSVLink from react-csv
import HashLoader from "react-spinners/HashLoader";
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
        dateTo: searchParams.get('dateTo') || '',
        isAnonymous: searchParams.get('isAnonymous') || '',
        page: page
    });

    const handleResetFilters = () => {

        setSearchParams(new URLSearchParams());
        setFilters({
            templeName: '',

            payId: '',
            templeCreatedBy: '',

            donateUser: '',

            paymentMethod: '',

            dateFrom: '',
            dateTo: '',
            isAnonymous: '',

        });


    }

    const [templeAdmins, setTempleAdmins] = useState([]);

    const fetchAllTempleAdmin = async () => {
        try {
            const res = await axios.get(`${api}/auth/all-temple-admin`);
            setTempleAdmins(res.data.users);
        } catch (error) {
            console.error('Error fetching temple admin:', error);
        }
    }
    useEffect(() => {
        fetchAllTempleAdmin();
    }, []);


    const fetchPaymentMethod = async () => {
        try {
            const res = await axios.get(`${api}/donation/fetch-payment-methods`);
            setPaymentMethod(res.data.paymentMethods);
        } catch (error) {
            console.error('Error fetching payment method:', error);
        }
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
                dateTo: searchParams.get('dateTo') || '',
                isAnonymous: searchParams.get('isAnonymous') || '',
                page: reset ? 1 : page
            });
            if (res.data.success) {
                if (reset) {
                    setDonations(res.data.donations);
                    setPage(2);
                } else {
                    setDonations(prev => [...prev, ...res.data.donations]);
                    setPage(prev => prev + 1);
                }
                res.data.donations.map(donation => console.log(donation.temple.templeName))

                setHasMore(res.data.donations.length == 10);
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

    // useEffect(() => {
    //     fetchAllDonation(true);
    // }, [filters]);



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
        // fetchAllDonation(true);
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
        setHasMore(true);
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
            dateTo: searchParams.get('dateTo') || '',
            isAnonymous: searchParams.get('isAnonymous') || ''

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
            await fetchPaymentMethod();
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


    // Prepare CSV data
    const csvData = donations.map((donation, index) => {
        const formattedDate = new Date(donation.date).toLocaleDateString('en-GB');
        const donateUser = donation.donateUser ? JSON.parse(donation.donateUser) : {};
        const createdBy = templeAdmins.find((admin) => admin._id === donation.temple?.createdBy)?.name || "Anonymous";

        return {
            SNo: index + 1,
            PaymentId: donation.razorpay_payment_id,
            Temple: donation.temple.templeName,
            TempleAdmin: createdBy,
            DateOfDonation: formattedDate,
            DonationByUser: donateUser.name ? `${donateUser.name} (${donateUser.email}, ${donateUser.phone})` : "Anonymous",
            Amount: donation.currency !== 'INR' ? donation.currency : "₹" + donation.amount,
            PaymentMethod: donation.method,
            PaymentStatus: donation?.status ? donation?.status?.slice(0, 1).toUpperCase() + donation?.status?.slice(1).toLowerCase() : "",
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
                <>
                    <div className="filter-container my-4">
                        <form className="row g-4" onSubmit={handleFilterSubmit}>
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="templeName"
                                    placeholder="Temple Name"
                                    value={filters.templeName}
                                    onChange={handleFilterChange}
                                />
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
                            {/* <div className="col-md-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="donateUser"
                                        placeholder="Donate User"
                                        value={filters.donateUser}
                                        onChange={handleFilterChange}
                                    />
                                </div> */}
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
                                {/* <label className='mx-2'>Anonymous Donations</label> */}
                                <select
                                    className="form-select"
                                    name="isAnonymous"
                                    value={filters.isAnonymous}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Anonymous Donation</option>
                                    <option value="true">Yes</option>
                                    <option value="">All</option>
                                </select>
                            </div>
                            <div className="col-md-2 flex-column align-items-start">
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
                            <div className="col-md-2 flex-column align-items-start">
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

                            {/* <div className="col-md-1">
                                <div className="d-flex justify-content-end m-0 p-0">
                                    <button type="submit" className="btn btn-theme-primary"><i className="fa-solid fa-filter"></i></button>
                                </div>
                            </div> */}
                        </form>
                    </div>

                </>
                {donations.length > 0 ? <><div className="d-flex justify-content-end">
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
                                    <td><p className='fw-bold text-primary'>Temple Admin</p></td>
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
                                    const createdBy = templeAdmins.find((admin) => admin._id === donation.temple?.createdBy)?.name || "Anonymous";


                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{donation.razorpay_payment_id} {donation.isAnonymous == true && <><i title='Anonymous Donation' style={{ fontSize: "14px" }} className="text-primary fa-solid fa-user-shield"></i></>}</td>
                                            <td>{donation.temple.templeName}</td>
                                            <td>{createdBy}</td>
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
                    </div></> : <> {!loading && <>No Donation found</>} </>}
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