import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UnverifiedTemples = () => {
    const api = import.meta.env.VITE_API_URL;
    const [newlyCreatedUnverifiedTemples, setNewlyCreatedUnverifiedTemples] = useState([])
    const [updatedByAdminUnverifiedTemples, setUpdatedByAdminUnverifiedTemples] = useState([])

    const fetchNewlyCreatedUnverifiedTemples = async () => {

        try {
            const res = await axios.get(`${api}/temple/unverified-newly-created-temples`);

            if (res.data.success) {
                setNewlyCreatedUnverifiedTemples(res.data.data.temples)

            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }


    }
    const fetchUpdatedByAdminUnverifiedTemples = async () => {

        try {
            const res = await axios.get(`${api}/temple/unverified-updated-by-admin-temples`);

            if (res.data.success) {
                setUpdatedByAdminUnverifiedTemples(res.data.data.temples)

            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }


    }


    const handleVerifyTemple = async (id) => {

        try {
            const res = await axios.post(`${api}/temple/verify-temple/${id}`);

            if (res.data.success) {
                toast.success(res.data.message);
                fetchNewlyCreatedUnverifiedTemples()
                fetchUpdatedByAdminUnverifiedTemples()

            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }


    }

    const handleRejectTemple = async (id) => {

        try {
            const res = await axios.post(`${api}/temple/reject-temple`, { id: id });

            if (res.data.success) {
                toast.success(res.data.message);
                fetchNewlyCreatedUnverifiedTemples()
                fetchUpdatedByAdminUnverifiedTemples()

            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }


    }





    useEffect(() => {
        fetchNewlyCreatedUnverifiedTemples()
        fetchUpdatedByAdminUnverifiedTemples()

    }, [])
    return (

        <Layout>
            <section>
                <div className="section-heading mb-2">
                    Unverified Temples
                </div>

                <h3 className='mb-2 fw-bold text-primary'> Recently Created </h3>
                {newlyCreatedUnverifiedTemples.length === 0 ? <div className='mt-4 text-center'>No unverified temples found</div> :


                    (<div className="table-responsive">
                        <table className=" table table-light table-bordered table-striped">
                            <thead>
                                <tr>
                                    <td><p className='fw-bold text-primary'>S.No</p></td>
                                    <td><p className='fw-bold text-primary'>Name</p></td>
                                    <td><p className='fw-bold text-primary'>Location</p></td>
                                    <td><p className='fw-bold text-primary'>Contact Person</p></td>
                                    <td><p className='fw-bold text-primary'>Created On</p></td>
                                    <td><p className='fw-bold text-primary'>Created By</p></td>
                                    <td><p className='fw-bold text-primary'>Type of Change</p></td>
                                    <td colSpan={3}><p className='fw-bold text-primary'>Actions</p></td>

                                </tr>
                            </thead>
                            <tbody>

                                {newlyCreatedUnverifiedTemples?.map((temple, index) => (
                                    <tr key={index}>

                                        <td> {index + 1}</td>
                                        <td>{temple.templeName}</td>
                                        <td>{temple.location.address}, {temple.location.country} </td>
                                        <td>{temple.contactPerson.name} ({temple.contactPerson.email}, {temple.contactPerson.mobile})</td>
                                        <td>{new Date(temple.createdOn).toLocaleString("en-US")}</td>
                                        <td>{temple.createdBy.name}</td>
                                        <td>{temple.createdBy.name}</td>
                                        <td><button onClick={() => handleVerifyTemple(temple._id)} className='btn btn-theme-primary'>Verify</button> </td>

                                        <td> <button onClick={() => handleRejectTemple(temple._id)} style={{ background: "var(--color-theme-error)", color: "#fff" }} className='btn '>Reject</button></td>
                                        <td><Link to={`/superadmin/verify-temple-changes/${temple._id}`} className='btn btn-theme-primary'>View Changes</Link></td>

                                    </tr>



                                ))}



                            </tbody>
                        </table>
                    </div>)}


                <h3 className='mb-2 fw-bold text-primary'> Modified by Admins </h3>

                {updatedByAdminUnverifiedTemples.length === 0 ? <div className='mt-4 text-center'>No unverified temples found</div> :


                    (<div className="table-responsive">
                        <table className=" table table-light table-bordered table-striped">
                            <thead>
                                <tr>
                                    <td><p className='fw-bold text-primary'>S.No</p></td>
                                    <td><p className='fw-bold text-primary'>Name</p></td>
                                    <td><p className='fw-bold text-primary'>Location</p></td>
                                    <td><p className='fw-bold text-primary'>Contact Person</p></td>
                                    <td><p className='fw-bold text-primary'>Created On</p></td>
                                    <td><p className='fw-bold text-primary'>Created By</p></td>
                                    <td><p className='fw-bold text-primary'>Type of Change</p></td>
                                    <td colSpan={3}><p className='fw-bold text-primary'>Actions</p></td>

                                </tr>
                            </thead>
                            <tbody>

                                {updatedByAdminUnverifiedTemples?.map((temple, index) => (
                                    <tr key={index}>

                                        <td> {index + 1}</td>
                                        <td>{temple.templeName}</td>
                                        <td>{temple.location.address}, {temple.location.country} </td>
                                        <td>{temple.contactPerson.name} ({temple.contactPerson.email}, {temple.contactPerson.mobile})</td>
                                        <td>{new Date(temple.createdOn).toLocaleString("en-US")}</td>
                                        <td>{temple.createdBy.name}</td>
                                        <td>{temple.createdBy.name}</td>
                                        <td><button onClick={() => handleVerifyTemple(temple._id)} className='btn btn-theme-primary'>Verify</button> </td>

                                        <td> <button onClick={() => handleRejectTemple(temple._id)} style={{ background: "var(--color-theme-error)", color: "#fff" }} className='btn '>Reject</button></td>
                                        <td><Link to={`/superadmin/verify-temple-changes/${temple._id}`} className='btn btn-theme-primary'>View Changes</Link></td>

                                    </tr>



                                ))}



                            </tbody>
                        </table>
                    </div>)}


            </section>
        </Layout >
    )
}

export default UnverifiedTemples