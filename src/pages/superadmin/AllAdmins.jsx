import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AllAdmins = () => {
    const api = import.meta.env.VITE_API_URL;
    const [templeAdmins, setTempleAdmins] = useState([])

    const fetchAllTempleAdmins = async () => {

        try {
            const response = await axios.get(`${api}/auth/all-temple-admin`);

            if (response.data.success) {

                setTempleAdmins(response.data.users)

            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
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

        fetchAllTempleAdmins()
    }, [])
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
        </Layout >
    )
}

export default AllAdmins