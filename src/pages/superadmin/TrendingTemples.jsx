import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ListingCard from '../../components/listingCard/ListingCard';

const TrendingTemples = () => {
    const api = import.meta.env.VITE_API_URL;

    const [trendingTemples, setTrendingTemples] = useState([])
    const [temples, setTemples] = useState([])

    const [searchFilter, setSearchFilter] = useState({
        templeName: null,
        location: null,
        isTrending: false

    })
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
            const res = await axios.get(`${api}/temple/get-verified-temples`, {
                params: {
                    templeName: searchFilter.templeName,
                    location: searchFilter.location,
                    isTrending: searchFilter.isTrending
                }
            });

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

    }, [searchFilter])
    const [isTrending, setIsTrending] = useState(false)
    function searchFilterSubmit(e) {
        e.preventDefault()
        setSearchFilter({
            templeName: e.target.templeName.value.trim() === "" ? null : e.target.templeName.value.trim(),
            location: e.target.location.value.trim() === "" ? null : e.target.location.value.trim(),
            isTrending: isTrending
        })
    }
    return (

        <Layout>
            <section>
                <h1 className="mb-4 section-heading">Trending Temples</h1>

                {/* search filters */}
                <form className="mb-4" onSubmit={searchFilterSubmit}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="Search by name" name='templeName' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="Search by location" name='location' />
                            </div>
                        </div>
                        {/* Is trending button */}
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                {/* <button className="btn btn-theme-primary" onClick={
                                () => setIsTrending(!isTrending)
                            } >Is Trending</button> */}
                                {
                                    isTrending ? <button type='button' className="btn btn-theme-primary" onClick={
                                        () => setIsTrending(!isTrending)
                                    } >Is Trending</button> : <button type='button' className="btn border-danger" onClick={
                                        () => setIsTrending(!isTrending)
                                    } >Is Trending</button>
                                }
                            </div>



                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <button className="btn btn-theme-primary" >Search</button>
                            </div>
                        </div>
                    </div>
                </form>



                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Temple Name</th>
                                <th>Location</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {temples.map((temple, index) => (
                                <tr key={index}>
                                    <td ><Link className='fw-bold text-decoration-underline text-primary' to={`/superadmin/temple/${temple._id}`}>{temple.templeName}</Link> </td>
                                    <td> {temple.location.address}</td>
                                    <td>  {temple.images.bannerImage && (
                                        <img src={temple.images.bannerImage} alt="Banner Preview" className="mt-2" style={{ height: '80px', border: "3px solid #fff" }} />
                                    )}</td>
                                    <td>
                                        {temple.isTrending == 0 ? <>    <button className="btn btn-theme-primary" onClick={() => handleSetTrendingTemples(temple._id)}>Add to Trending</button></> : <>    <button className="btn btn-theme-error" onClick={() => handleRemoveTrendingTemple(temple._id)}>Remove from Trending</button></>}

                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
                {temples.length === 0 && <div className='my-4  text-center'>No Temples Found</div>}
            </section>

        </Layout >
    )
}

export default TrendingTemples