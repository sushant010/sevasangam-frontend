import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import ListingCardAdmin from '../../components/listingCardAdmin/ListingCardAdmin';

const TemplesBySingleAdmin = () => {
    const api = import.meta.env.VITE_API_URL;
    const { id } = useParams();

    const [temples, setTemples] = useState()

    const fetchTemplesByAdmin = async () => {
        try {
            const response = await axios.post(`${api}/temple/get-temples-by-admin`, { userId: id });

            if (response.data.success) {
                // toast.success(response.data.message);
                setTemples(response.data.data.temples)

            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }

    };

    useEffect(() => {

        fetchTemplesByAdmin()

    }, [])

    return (
        <Layout>
            <section>
                <div className="listing-container">

                    {temples && temples.length > 0 && temples.map((temple, index) => {
                        return <ListingCardAdmin key={index} temple={temple} />
                    })}

                </div>
            </section>

        </Layout>
    )
}

export default TemplesBySingleAdmin