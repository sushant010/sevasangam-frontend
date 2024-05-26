import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";

const VerifyTempleChanges = () => {
    const { id } = useParams();
    const api = import.meta.env.VITE_API_URL;
    const [pendingChanges, setPendingChanges] = useState(null);
    const [currentTemple, setCurrentTemple] = useState({});
    const navigate = useNavigate();

    const fetchCurrentTemple = async () => {
        try {

            const res = await axios.get(`${api}/temple/get-temple/${id}`);
            if (res.data.success) {
                setCurrentTemple(res.data.data);
                console.log("current temple")
                console.log(res.data.data);

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error fetching current temple:', error);
        }
    }

    const fetchPendingChanges = async () => {
        try {
            const res = await axios.get(`${api}/temple/pending-changes/${id}`);
            if (res.data.success) {
                console.log("modified temple")
                console.log(res.data.data)
                if (currentTemple?.isCreated === 1) {
                    const modifiedTemple = res.data.data;

                    setPendingChanges(modifiedTemple);
                }


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
                setTimeout(() => { navigate('/superadmin/unverified-temples') }, 2000);
            }
        } catch (error) {
            console.error('Error approving changes:', error);
        }
    };

    useEffect(() => {
        fetchPendingChanges();
        fetchCurrentTemple();
    }, []);

    const renderPropertyRows = (object) => {
        return Object.entries(object).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                return (
                    <tr key={key}>
                        <td colSpan={2}>{key}</td>
                    </tr>
                );
            } else {
                return (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>

                    </tr>
                );
            }
        });
    };


    return (
        <Layout>
            <section>
                {currentTemple?.isCreated === 1 && (
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
                    <div style={{ fontSize: "30px" }} className="section-heading mb-2">
                        Review Changes : {currentTemple?.templeName}
                    </div>

                )}
            </section>
        </Layout >
    );

};

export default VerifyTempleChanges;
