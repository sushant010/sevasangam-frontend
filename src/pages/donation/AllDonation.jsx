import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout';

const AllDonation = () => {

    const [donation, setDonation] = useState(null);
    const api = import.meta.env.VITE_API_URL;
    const fetchDonationsByUser = async () => {
        try {
            try {
                const response = await axios.get(`${api}/donation/all-donation`);
                if (response.data.success) {
                    setDonation(response.data.donation);
                }
            } catch (error) {
                console.error('Error fetching donation:', error);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }

    }

    useEffect(() => {
        fetchDonationsByUser()
    })

    return (
        <Layout>
            <section>

                <div className="section-heading">
                    All Donations
                </div>
                <div className="table-responsive">
                    <table className="table table-light table-bordered table-striped">
                        <thead>
                            <tr>
                                <td ><p className='fw-bold text-primary'>S. No</p></td>
                                <td ><p className='fw-bold text-primary'>Temple</p></td>

                                <td ><p className='fw-bold text-primary'>Date of Donation</p></td>
                                <td ><p className='fw-bold text-primary'>Donation by User</p></td>
                                <td ><p className='fw-bold text-primary'>Payment Method</p></td>
                                <td ><p className='fw-bold text-primary'>Transaction Id</p></td>
                                <td ><p className='fw-bold text-primary'>Payment Status</p></td>

                            </tr>
                        </thead>
                        <tbody>


                            <tr>
                                <td >S. No</td>
                                <td >Temple</td>
                                <td >Date of Donation</td>
                                <td >Donation by User</td>
                                <td >Payment Method</td>
                                <td >Transaction Id</td>
                                <td >Payment Status</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </section>
        </Layout>
    )
}

export default AllDonation