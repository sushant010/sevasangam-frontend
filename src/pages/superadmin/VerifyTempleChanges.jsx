import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyTempleChanges = () => {
    const { id } = useParams();
    const api = import.meta.env.VITE_API_URL;
    const [pendingChanges, setPendingChanges] = useState(null);
    const navigate = useNavigate();

    const fetchPendingChanges = async () => {
        try {
            const res = await axios.get(`${api}/temple/pending-changes/${id}`);
            if (res.data.success) {
                setPendingChanges(res.data.data);
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
                navigate('/superadmin/unverified-temples')
            }
        } catch (error) {
            console.error('Error approving changes:', error);
        }
    };

    useEffect(() => {
        fetchPendingChanges();
    }, []);

    const renderTempleDetails = (pendingChanges) => {
        return Object.entries(pendingChanges).map(([key, value]) => (
            <tr key={key}>
                <td><strong>{key}</strong></td>
                <td>
                    {typeof value === "object" ? (
                        <pre>{renderNestedData(value)}</pre>
                    ) : (
                        <span>{value}</span>
                    )}
                </td>
            </tr>
        ));
    };

    const renderNestedData = (data) => {
        return Object.entries(data).map(([nestedKey, nestedValue]) => (
            <div key={nestedKey}>
                <strong>{nestedKey}: </strong>
                <span>{nestedValue}</span>
            </div>
        ));
    };

    return (
        <Layout>
            <section>
                <div className="section-heading mb-2">Review Changes</div>
                {pendingChanges ? (
                    <div>
                        <h4 className="mb-2">Pending Changes for Temple ID: {id}</h4>
                        <table className="table table-light table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTempleDetails(pendingChanges)}
                            </tbody>
                        </table>
                        <button onClick={handleApproveChanges} className='btn btn-theme-primary'>Approve Changes</button>
                    </div>
                ) : (
                    <p>No pending changes to review.</p>
                )}
            </section>
        </Layout>
    );
};

export default VerifyTempleChanges;
