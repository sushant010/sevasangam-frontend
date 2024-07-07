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
            const email = auth?.user?.email;
            console.log(auth?.user?.email)
            const res = await axios.post(`${api}/donation/fetch-donations-by-user`, { email });
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




    useEffect(() => {
        fetchAllDonationOfUser();
        fetchAllTemples();
    }, [auth]);


    return (
        <>
            {requestCertificateLoading && <LoadingSpinner />}
            <section>
                <div className="section-heading">
                    Past Donations
                </div>
                {(auth?.user && donations?.length == 0) ? <p className='text-muted'>No donations found , Please Donate to a Temple Below <i className=" text-primary fa-solid fa-arrow-down"></i></p> : <div className="table-responsive">
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



                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>{donation.temple.templeName}</td>

                                        <td>{formattedDate}</td>
                                        <td>{donation.currency !== 'INR' ? donation.currency : "₹"} {donation.amount}</td>
                                        <td>

                                            {(donation?.is80CertificateRequested === false && !donation.certificate) ? <> <button onClick={() => handleRequestCertificate(donation._id)} className='btn btn-theme-primary' title="Request 80 Certificate">
                                                Request 80 Certificate
                                            </button></> : <>

                                                {donation?.certificate ? <>
                                                    <div style={{ gap: "6px" }} className='d-flex flex-wrap'>
                                                        {/* <div className="file-preview">
                                                            <a className='btn btn-theme-primary' rel="noopener noreferrer" target="_blank" href={donation.certificate}><i className="fa-solid fa-eye"></i> View</a>
                                                        </div> */}
                                                        <div className="file-preview">
                                                            <a className='btn btn-theme-primary' target="_blank" href={donation.certificate} download><i className="fa-solid fa-download"></i> Download</a>
                                                        </div>

                                                        {(donation.is80CertificateRequested && donation.certificate) ? <><p className='mt-1 text-danger'>Certificate Requested again</p></> : <button onClick={() => {
                                                            handleRequestCertificate(donation._id);
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
                </div>}


                {loading && (
                    <section className="d-flex m-auto justify-content-center">
                        <HashLoader color={"#ff395c"} />
                    </section>
                )}

            </section>
        </ >
    );
}

export default UserDonations