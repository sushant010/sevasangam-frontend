import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';
import Unauthorize from '../pages/notAuthorized/Unauthorize';

const IsBothAdminSuperadmin = () => {
    const api = import.meta.env.VITE_API_URL;
    const [auth] = useAuth();
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true);

    const token = auth.token;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const templeAdminRes = await axios.get(`${api}/auth/templeadmin-auth`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const superadminRes = await axios.get(`${api}/auth/superadmin-auth`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (templeAdminRes?.data?.ok || superadminRes?.data?.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error('Authorization check failed:', error);
                setOk(false);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            checkAuth();
        } else {
            setLoading(false);
        }

    }, [api, auth?.token]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return ok ? <Outlet /> : <Unauthorize />;
};

export default IsBothAdminSuperadmin;