import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';

const UserDonations = () => {

    const api = import.meta.env.VITE_API_URL;
    const [razorpayDonations, setRazorpayDonations] = useState([]);
    const [donations, setDonations] = useState([]);
    const [temples, setTemples] = useState([]);

    const [auth] = useAuth();

    const fetchAllDonationOfUser = async () => {
        try {
            const email  = auth.user.email;
            const res = await axios.post(`${api}/donation/fetch-donations-by-user`, { email });
            console.log(res)
            setRazorpayDonations(res.data.razorpayDonations)
            setDonations(res.data.donations)
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    };

    const handleRequestCertificate = async (id) => {
        try {
            const res = await axios.post(`${api}/donation/request-80-certificate`, { id });
            
            if (res.data.success) {

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
        fetchAllTemples()
    }, []);


    return (
        <Layout>
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
                                <td ><p className='fw-bold text-primary'>Actions</p></td>

                            </tr>
                        </thead>
                        <tbody>
                            {razorpayDonations && razorpayDonations.map((donation, index) => {

                                const formattedDate = new Date(donation.created_at * 1000).toLocaleDateString('en-US');
                                const customDonation = donations.find((don)=>don.razorpay_payment_id === donation.id)

                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>{temples.find((temp) => temp._id === donation.notes.temple)?.templeName}</td>

                                        <td>{formattedDate}</td>
                                        <td>{donation.currency !== 'INR' ? donation.currency : "₹"} {donation.amount}</td>
                                        <td>
                                            {customDonation.is80CertificateRequested === false ? <> <button onClick={handleRequestCertificate(donation.id)} className='btn btn-theme-primary' title="View Temple">
                                            Request 80 Certificate
                                        </button></> : <> <button>Request submitted for 80G Certificate</button></>}
                                       
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
            </section>
        </Layout >
    );
}

export default UserDonations