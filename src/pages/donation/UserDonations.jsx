import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
const UserDonations = () => {

    const api = import.meta.env.VITE_API_URL;
    const [donations, setDonations] = useState([]);
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(false)
    const [requestCertificateLoading, setRequestCertificateLoading] = useState(false)
    const [isCertificateRequestedAgain, setIsCertificateRequestedAgain] = useState(false)

    const [auth] = useAuth();

    const fetchAllDonationOfUser = async () => {
        try {
            const email = auth.user.email;
            const res = await axios.post(`${api}/donation/fetch-donations-by-user`, { email });
            console.log(res)
            setDonations(res.data.donations)
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    };

    const handleRequestCertificate = async (id) => {
        setRequestCertificateLoading(true)
        try {
            const res = await axios.post(`${api}/donation/request-80-certificate`, { id });

            if (res.data.success) {
                setRequestCertificateLoading(false)
                toast.success(res.data.message);
                fetchAllDonationOfUser();
            }

        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    }


    const fetchAllTemples = async () => {
        try {
            const res = await axios.get(`${api}/temple/get-temples`);
            setTemples(res.data.data.temples)
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            await fetchAllDonationOfUser();
            await fetchAllTemples();

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        // fetchAllDonationOfUser();
        // fetchAllTemples()

        fetchData();
    }, []);


    return (
        <Layout>
            {requestCertificateLoading && <LoadingSpinner />}
            <section>
                <div className="section-heading">
                    Past Donations
                </div>
                <div className="table-responsive">
                    <table className=" table table-light table-bordered table-striped">
                        <thead>
                            <tr>
                                <td><p className='fw-bold text-primary'>S.No</p></td>
                                <td><p className='fw-bold text-primary'>Temple</p></td>
                                <td><p className='fw-bold text-primary'>Date</p></td>
                                <td><p className='fw-bold text-primary'>Amount</p></td>
                                <td ><p className='fw-bold text-primary'>80G Certificate</p></td>

                            </tr>
                        </thead>
                        <tbody>
                            {donations && donations.map((donation, index) => {

                                const formattedDate = new Date(donation.date).toDateString();
                                const customDonation = donations.find((don) => don.razorpay_payment_id === donation.id)
                                console.log(donation)
                                console.log(customDonation)

                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>{temples.find((temp) => temp._id === donation.temple)?.templeName}</td>

                                        <td>{formattedDate}</td>
                                        <td>{donation.currency !== 'INR' ? donation.currency : "₹"} {donation.amount}</td>
                                        <td>

                                            {customDonation && customDonation.is80CertificateRequested === false ? <> <button onClick={() => handleRequestCertificate(donation.id)} className='btn btn-theme-primary' title="Request 80 Certificate">
                                                Request 80 Certificate
                                            </button></> : <>

                                                {customDonation && customDonation.certificate ? <>
                                                    <div style={{ gap: "6px" }} className='d-flex flex-wrap'>
                                                        <div className="file-preview">
                                                            <a className='btn btn-theme-primary' rel="noopener noreferrer" target="_blank" href={customDonation.certificate}><i className="fa-solid fa-eye"></i> View</a>
                                                        </div>
                                                        <div className="file-preview">
                                                            <a className='btn btn-theme-primary' target="_blank" href={customDonation.certificate} download><i className="fa-solid fa-download"></i> Download</a>
                                                        </div>

                                                        {customDonation.is80CertificateRequested && customDonation.certificate ? <><p className='mt-1 text-danger'>Certificate Requested again</p></> : <button onClick={() => {
                                                            handleRequestCertificate(donation.id); setIsCertificateRequestedAgain(true)
                                                        }} className='btn btn-theme-primary' title="Request 80 Certificate">
                                                            Request 80 Certificate Again
                                                        </button>}


                                                    </div>
                                                </> : <p>Request submitted for 80G Certificate</p>}
                                            </>}
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>

                {loading && (
                    <section className="d-flex m-auto justify-content-center">
                        <HashLoader color={"#ff395c"} />
                    </section>
                )}

            </section>
        </Layout >
    );
}

export default UserDonations