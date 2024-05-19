import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import Unauthorize from '../pages/notAuthorized/Unauthorize'
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner'



const IsTempleAdmin = () => {

    const api = import.meta.env.VITE_API_URL;
    const [auth] = useAuth();
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true);

    const token = auth.token;

    useEffect(() => {
        const checkAuth = async () => {
            try {

                const res = await axios.get(`${api}/auth/admin-auth`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use Bearer token standard
                    },
                });

                if (res?.data?.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error('Authorization check failed:', error);
                setOk(false);
            } finally {
                setLoading(false); // End loading state
            }
        };

        if (token) {
            checkAuth();
        } else {
            setLoading(false); // If no token, end loading immediately
        }

    }, [auth?.token])

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>; // Render loading state
    }

    return ok ? <Outlet /> : <Unauthorize />;
}

export default IsTempleAdmin