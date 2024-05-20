import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UnverifiedTemples = () => {
    const api = import.meta.env.VITE_API_URL;
    const [unverifiedTemples, setUnverifiedTemples] = useState([])

    const fetchAllTempleAdmins = async () => {

        try {
            const response = await axios.get(`${api}/temple/unverified-temples`);

            if (response.data.success) {
                console.log(response)
                toast.success(response.data.message);
                setUnverifiedTemples(response.data.users)

            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }


    }


    useEffect(() => {

        fetchAllTempleAdmins()
    }, [])
    return (

        <Layout>
            <section>
                <div className="section-heading mb-2">
                    Unverified Temples
                </div>
                <div className="table-responsive">
                    <table className=" table table-light table-bordered table-striped">
                        <thead>
                            <tr>
                                <td><p className='fw-bold text-primary'>S.No</p></td>
                                <td><p className='fw-bold text-primary'>Name</p></td>
                                <td><p className='fw-bold text-primary'>Location</p></td>
                                <td><p className='fw-bold text-primary'>Contact Person</p></td>
                                <td><p className='fw-bold text-primary'>Created On</p></td>
                                <td><p className='fw-bold text-primary'>Created By</p></td>
                                <td><p className='fw-bold text-primary'>Actions</p></td>

                            </tr>
                        </thead>
                        <tbody>

                            {unverifiedTemples?.map((temple, index) => (
                                <tr key={index}>

                                    <td> {index + 1}</td>
                                    <td>{temple.name}</td>
                                    {/* <td>{temple.email}</td>
                                <td>{temple.phone}</td>
                                <td>{temple.totalTempleCreated}</td> */}
                                    <td></td>
                                    <td><Link to={`/superadmin/temples-listed/${temple._id}`} className='btn btn-theme-primary'>View Temples</Link></td>

                                </tr>



                            ))}



                        </tbody>
                    </table>
                </div>


            </section>
        </Layout >
    )
}

export default UnverifiedTemples