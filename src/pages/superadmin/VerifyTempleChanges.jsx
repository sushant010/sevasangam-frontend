import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";

const VerifyTempleChanges = () => {
    const { id } = useParams();
    const api = import.meta.env.VITE_API_URL;

    const [pendingChanges, setPendingChanges] = useState({});

    const [currentTemple, setCurrentTemple] = useState({});
    const [createdBy, setCreatedBy] = useState('');
    const navigate = useNavigate();

    const fetchCurrentTemple = async () => {
        try {
            const res = await axios.get(`${api}/temple/get-temple/${id}`);
            if (res.data.success) {
                // console.log("current temple below")
                // console.log(res.data.data)
                setCurrentTemple(res.data.data);
                setCreatedBy(res.data.data.createdBy);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error fetching current temple:', error);
        }
    };

    const fetchPendingChanges = async () => {
        try {
            const res = await axios.get(`${api}/temple/pending-changes/${id}`);
            if (res.data.success) {

                const modifiedTemple = res.data.data;
                setPendingChanges(modifiedTemple);

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error fetching pending changes:', error);
        }
    };

    const handleApproveChanges = async () => {
        try {
            const res = await axios.post(`${api}/temple/verify-temple/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    navigate('/superadmin/unverified-temples')
                }, 2000);
            }
        } catch (error) {
            console.error('Error approving changes:', error);
        }
    };

    useEffect(() => {
        fetchPendingChanges();
        fetchCurrentTemple();
    }, []);

    const formatKey = (key) => {
        // Split the string at uppercase letters and join with spaces
        return key.replace(/([A-Z])/g, ' $1') // Add a space before each uppercase letter
            .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
    };

    const renderPropertyRows = (object) => {

        // console.log(object)

        return Object.entries(object).map(([key, value]) => {



            if (typeof value === 'object' && value !== null) {

                if (key === 'otherImages' && value.length > 0) {
                    return (
                        <>
                            <tr>
                                <td>{formatKey(key)}</td>
                                <td>
                                    {value.map((img, index) => {
                                        return <img key={index} src={img} alt="Banner Preview" className="mt-2" style={{ width: 'auto', height: '100px', border: "3px solid #fff" }} />
                                    })}
                                </td>
                            </tr>
                        </>
                    );
                } else {
                    return (
                        <React.Fragment key={key}>
                            <tr>
                                <td colSpan={2}>
                                    <strong>{formatKey(key)}</strong>
                                </td>
                            </tr>
                            {renderPropertyRows(value)}
                        </React.Fragment>
                    );

                }





            } else {
                if (key === 'logo' || key === 'bannerImage') {
                    return (
                        <>
                            <tr>
                                <td>{formatKey(key)}</td>
                                <td> <img src={value} alt="Banner Preview" className="mt-2" style={{ width: 'auto', height: '100px', border: "3px solid #fff" }} /></td>
                            </tr>
                        </>
                    );
                } else {
                    return (
                        <>        <tr>
                            <td>{formatKey(key)}</td>
                            <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>   </tr>
                        </>
                    );
                }


            }
        });

    };

    const renderPropertyRowsForModifiedTemples = (currentTemple, modifiedTemple) => {
        console.log("current below")
        console.log(currentTemple)
        console.log("modified below")
        console.log(modifiedTemple)
        // return Object.entries(modifiedTemple).map(([key, value]) => {
        //     if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        //         return (
        //             <React.Fragment key={key}>
        //                 <tr>
        //                     <td colSpan={3}>
        //                         <strong>{formatKey(key)}</strong>
        //                     </td>
        //                 </tr>
        //                 {/* {renderPropertyRowsForModifiedTemples(currentTemple[key] || {}, value)} */}
        //             </React.Fragment>
        //         );
        //     } else {
        //         if (key === 'logo' || key === 'bannerImage') {
        //             return (
        //                 <>
        //                     <tr>
        //                         <td>{formatKey(key)}</td>
        //                         <td> <img src={currentTemple[key] || ''} className="mt-2" style={{ width: 'auto', height: '100px', border: "3px solid #fff" }} /></td>
        //                         <td> <img src={value || ''} className="mt-2" style={{ width: 'auto', height: '100px', border: "3px solid #fff" }} /></td>
        //                     </tr>
        //                 </>
        //             );
        //         } else if (key === 'otherImages') {
        //             return (
        //                 <>
        //                     <tr>
        //                         <td>{formatKey(key)}</td>
        //                         <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>    </tr>
        //                 </>
        //             );
        //         } else {
        //             return (
        //                 <>        <tr>
        //                     <td>{formatKey(key)}</td>
        //                     <td>{currentTemple[key] || ''}</td>
        //                     <td style={{ color: 'var(--color-theme-success)' }}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>

        //                 </tr>
        //                 </>
        //             );
        //         }
        //     }
        // });
    };



    return (
        <Layout>
            <section>
                {currentTemple?.isCreated === 1 && (
                    <div>
                        <div style={{ fontSize: "30px" }} className="section-heading mb-2">
                            Review New Created Temple : {currentTemple?.templeName}
                        </div>
                        {pendingChanges ? (
                            <div>
                                <div className="mb-2 text-primary d-flex justify-content-end">Created by: {createdBy.name}</div>
                                <table className="table table-light table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Property</th>
                                            <th>Value</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderPropertyRows(pendingChanges)}
                                    </tbody>
                                </table>
                                <button onClick={handleApproveChanges} className='btn btn-theme-primary'>
                                    Approve Changes
                                </button>
                            </div>
                        ) : (
                            <p>No pending changes to review.</p>
                        )}
                    </div>

                )}

                {!(currentTemple?.isCreated === 1) && (
                    <div>
                        <div style={{ fontSize: "30px" }} className="section-heading mb-2">
                            Review Changes : {currentTemple?.templeName}
                        </div>
                        {pendingChanges ? (
                            <div>
                                <table className="table table-light table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Property</th>
                                            <th>Current</th>
                                            <th>Modified</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderPropertyRowsForModifiedTemples(currentTemple, pendingChanges)}
                                    </tbody>
                                </table>
                                <button onClick={handleApproveChanges} className='btn btn-theme-primary'>
                                    Approve Changes
                                </button>
                            </div>
                        ) : (
                            <p>No pending changes to review.</p>
                        )}
                    </div>


                )}
            </section>
        </Layout >
    );

};

export default VerifyTempleChanges;
