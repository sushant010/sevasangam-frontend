import { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import ListingCard from "../../components/listingCard/ListingCard"
import { useAuth } from "../../context/Auth"
import axios from "axios"
import toast from 'react-hot-toast';
import ListingCardAdmin from "../../components/listingCardAdmin/ListingCardAdmin"
import { useAdminTemples } from "../../context/AdminTemples"


const AdminTemples = () => {


    const api = import.meta.env.VITE_API_URL;
    const [auth, setAuth] = useAuth()

    const [adminTemples, setAdminTemples] = useAdminTemples()

    const fetchTemplesByAdmin = async () => {
        if (auth.user.role == 1) {
            const userId = auth?.user?._id;

            try {
                const response = await axios.post(`${api}/temple/get-temples-by-admin`, { userId: userId });

                if (response.data.success) {
                    // toast.success(response.data.message);
                    setAdminTemples(response.data.data.temples)
                    localStorage.setItem('adminTemples', JSON.stringify(response.data.data.temples))
                } else {
                    toast.error(response.data.message);
                }

            } catch (error) {
                console.error('Error creating temple:', error);
            }
        } else {


            try {
                const response = await axios.get(`${api}/temple/get-temples`);

                if (response.data.success) {
                    // toast.success(response.data.message);
                    setAdminTemples(response.data.data.temples)
                    localStorage.setItem('adminTemples', JSON.stringify(response.data.data.temples))
                } else {
                    toast.error(response.data.message);
                }

            } catch (error) {
                console.error('Error creating temple:', error);
            }
        }
    };

    useEffect(() => {

        fetchTemplesByAdmin()

    }, [auth])

    return (
        <Layout>
            <section>
                <div className="listing-container">

                    {adminTemples && adminTemples.length > 0 && adminTemples.map((temple, index) => {
                        return <ListingCardAdmin key={index} temple={temple} />
                    })}

                </div>
            </section>

        </Layout>
    )
}

export default AdminTemples