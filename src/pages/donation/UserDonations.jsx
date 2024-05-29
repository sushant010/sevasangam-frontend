import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';

const UserDonations = () => {

    const api = import.meta.env.VITE_API_URL;
    const [donations, setDonations] = useState([]);
    const [temples, setTemples] = useState([]);

    const fetchAllDonation = async (id) => {
        try {
            const res = await axios.get(`${api}/donation/fetch-donations-by-user`,{id});

            setDonations(res.data.donations)
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display a toast message
        }
    };

    const handleRequestCertificate = async (id) => {
        try {
            const res = await axios.post(`${api}/donation/request-80-certificate`,{id});
            console.log(res.data)
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
        fetchAllDonation();
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
                            {donations && donations.map((donation, index) => {

                                const formattedDate = new Date(donation.created_at * 1000).toLocaleDateString('en-US');

                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>{temples.find((temp) => temp._id === donation.notes.temple)?.templeName}</td>

                                        <td>{formattedDate}</td>
                                        <td>{donation.currency !== 'INR' ? donation.currency : "₹"} {donation.amount}</td>
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
            </section>
        </Layout >
    );
}

export default UserDonations