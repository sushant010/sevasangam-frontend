import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const AllAdmins = () => {
    const api = import.meta.env.VITE_API_URL;
    const [templeAdmins, setTempleAdmins] = useState([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    const fetchAllTempleAdmins = async (reset = false) => {

        try {
            if (loading || (!hasMore && !reset)) return;

            setLoading(true);

            const response = await axios.get(`${api}/auth/all-temple-admin`, {}, {
                params: {
                    page: reset ? 1 : page,
                    limit: 10, // Increased limit to 10 as you're checking for 10 items
                },
            });

            if (response.data.success) {



                const data = response.data.users;

                if (reset) {
                    setTempleAdmins(data);
                    setPage(2);
                } else {
                    setTempleAdmins((prevData) => [...prevData, ...data]);
                    setPage((prevPage) => prevPage + 1);
                }

                setHasMore(data.length === 10); // Set to false if less than 10 items



            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        } finally {
            setLoading(false); // Ensure loading is set to false after the API call
        }


    }
    const [donationTotals, setDonationTotals] = useState({});
    useEffect(() => {
        const fetchDonationTotals = async () => {
            try {
                const totals = {};
                for (let admin of templeAdmins) {
                    const response = await axios.get(`${api}/auth/total-donation-by-admin/${admin._id}`);
                    if (response.data.success) {
                        totals[admin._id] = response.data.totalDonation;
                    } else {
                        toast.error(response.data.message);
                    }
                }
                setDonationTotals(totals);
            } catch (error) {
                console.error('Error fetching total donation:', error);
                toast.error('Error fetching total donation');
            }
        };

        fetchDonationTotals();
    }, [templeAdmins]);


    useEffect(() => {
        fetchAllTempleAdmins(true);
    }, []);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading && hasMore) {
            fetchAllTempleAdmins();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);


    return (

        <Layout>
            <section>
                <div className="section-heading mb-2">
                    Temple Listers
                </div>
                <div className="table-responsive">
                    <table className="table table-light table-bordered table-striped">
                        <thead>
                            <tr>
                                <td><p className='fw-bold text-primary'>S.No</p></td>
                                <td><p className='fw-bold text-primary'>Name</p></td>
                                <td><p className='fw-bold text-primary'>Email</p></td>
                                <td><p className='fw-bold text-primary'>Phone</p></td>
                                <td><p className='fw-bold text-primary'>Total Temple Listed</p></td>
                                <td><p className='fw-bold text-primary'>Total Donation Collected</p></td>
                                <td><p className='fw-bold text-primary'>Actions</p></td>

                            </tr>
                        </thead>
                        <tbody>

                            {templeAdmins?.map((admin, index) => (
                                <tr key={index}>

                                    <td> {index + 1}</td>
                                    <td>{admin.name}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.phone}</td>
                                    <td>{admin.totalTempleCreated}</td>
                                    <td>{donationTotals[admin._id] !== undefined ? donationTotals[admin._id] : 'Loading...'}</td>
                                    <td><Link to={`/superadmin/temples-listed/${admin._id}`} className='btn btn-theme-primary'>View Temples</Link></td>

                                </tr>



                            ))}



                        </tbody>
                    </table>
                </div>


            </section>
            {loading && (
                <section className="d-flex m-auto">
                    <HashLoader color={"#ff395c"} />
                </section>
            )}
        </Layout >
    )
}

export default AllAdmins