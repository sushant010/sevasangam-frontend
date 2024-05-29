import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ListingCard from '../../components/listingCard/ListingCard';

const TrendingTemples = () => {
    const api = import.meta.env.VITE_API_URL;
  
    const [trendingTemples, setTrendingTemples] = useState([])
    const [temples, setTemples] = useState([])

    const fetchTrendingTemples = async () => {

        try {
            const res = await axios.get(`${api}/temple/fetch-trending-temples`);

            if (res.data.success) {
                setTrendingTemples(res.data.data.temples)

            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }


    }
 
    const fetchAllTemples = async () => {

        try {
            const res = await axios.get(`${api}/temple/get-temples`);

            if (res.data.success) {
                
                setTemples(res.data.data.temples)

            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }


    }
 


    const handleSetTrendingTemples = async (id) => {

        try {
            const res = await axios.post(`${api}/temple/add-trending-temple/${id}`);

            if (res.data.success) {
                toast.success(res.data.message);
                fetchTrendingTemples()
                fetchAllTemples()
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error adding temple:', error);
        }


    }

    const handleRemoveTrendingTemple = async (id) => {

        try {
            const res = await axios.delete(`${api}/temple/remove-trending-temple/${id}`);

            if (res.data.success) {
                toast.success(res.data.message);
                fetchTrendingTemples()
                fetchAllTemples()
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error adding temple:', error);
        }


    }


    useEffect(() => {
        fetchTrendingTemples()
        fetchAllTemples()

    }, [])
    return (

        <Layout>
            <section>
            <h1 className="mb-4 section-heading">Trending Temples</h1>
            
               
                       
                <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Temple Name</th>
                                    <th>Location</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {temples.map((temple, index) => (
                                    <tr key={index}>
                                        <td>{temple.templeName}</td>
                                        <td> {temple.location && temple.location.address}</td>
                                        <td>  {temple.images.bannerImage && (
                                    <img src={temple.images.bannerImage} alt="Banner Preview" className="mt-2" style={{height: '80px', border: "3px solid #fff" }} />
                                )}</td>
                                        <td>
                                        {temple.isTrending==0 ? <>    <button className="btn btn-theme-primary" onClick={() => handleSetTrendingTemples(temple._id)}>Add to Trending</button></> : <>    <button className="btn btn-theme-error" onClick={() => handleRemoveTrendingTemple(temple._id)}>Remove from Trending</button></>}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
            </section>
          
        </Layout >
    )
}

export default TrendingTemples