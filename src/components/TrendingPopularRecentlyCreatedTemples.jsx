import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Carousel from 'react-grid-carousel'
import ListingCard from './listingCard/ListingCard'
import LoadingSpinner from './loadingSpinner/LoadingSpinner'
import { set } from 'zod'
import { usePopularTemples } from '../context/PopularTemples'
import { useTrendingTemples } from '../context/TrendingTemples'
import { useRecentlyCreatedTemples } from '../context/RecentlyCreatedTemples'
import { setItemWithExpiry } from './LocalStorageSet'

const TrendingPopularRecentlyCreatedTemples = () => {


    const [trendingTemples, setTrendingTemples] = useTrendingTemples([])
    const [popularTemples, setPopularTemples] = usePopularTemples([])
    const [recentlyCreatedTemples, setRecentlyCreatedTemples] = useRecentlyCreatedTemples([])


    const [loading, setLoading] = useState(false)

    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const fetchPopularTemples = async () => {
        if (popularTemples.length > 0) {
            return;
        }
        try {
            const response = await axios.post(`${api}/temple/filter-temples`, { sortOption: 'mostPopular', limit: 7 });
            if (response.data.success) {
                setPopularTemples(response.data.data.temples);
                setItemWithExpiry('popularTemples', response.data.data.temples, 3600000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching filtered temples:', error);
        }
    };

    const fetchRecentlyCreatedTemples = async () => {
        if (recentlyCreatedTemples.length > 0) {
            return;
        }
        try {
            const response = await axios.post(`${api}/temple/filter-temples`, { sortOption: 'recentlyAdded', limit: 7 });
            if (response.data.success) {
                setRecentlyCreatedTemples(response.data.data.temples);
                setItemWithExpiry('recentlyCreatedTemples', response.data.data.temples, 3600000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching filtered temples:', error);
        }
    };

    const fetchTrendingTemples = async () => {
        if (trendingTemples.length > 0) {
            return;
        }
        try {
            const res = await axios.get(`${api}/temple/fetch-trending-temples`, { params: { limit: "7" } });

            if (res.data.success) {
                setTrendingTemples(res.data.data.temples)
                setItemWithExpiry('trendingTemples', res.data.data.temples, 3600000);
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }


    }


    const handleViewAllPopularTemples = () => {

        window.scrollTo(0, 0);
        navigate('/temples?sortOption=mostPopular')
    }

    const handleViewAllRecentCreatedTemples = () => {

        window.scrollTo(0, 0);
        navigate('/temples?sortOption=recentlyAdded')
    }

    const handleViewAllTrendingTemples = () => {
        window.scrollTo(0, 0);
        navigate('/temples?sortOption=trending')
    }



    const fetchData = async () => {
        setLoading(true); // Indicate that loading is in progress

        try {
            // Run all fetch functions simultaneously and wait for all of them to complete
            await Promise.all([
                fetchPopularTemples(),
                fetchRecentlyCreatedTemples(),
                fetchTrendingTemples()
            ]);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error appropriately, e.g., set an error state
        } finally {
            setLoading(false); // Indicate that loading is finished
        }
    };

    useEffect(() => {
        fetchData()
    }, []);


    return (

        <>

            {trendingTemples && trendingTemples.length > 0 && (
                <section className="listings">
                    <div className="section-heading line">
                        Trending Temples
                        <span className="text-sm d-block mx-2 fw-light text-grey-light">
                            Donate to the trending temples
                        </span>
                    </div>

                    <div className="row">

                        {/* eslint-disable-next-line */}
                        <Carousel cols={4} rows={1} gap={0} loop hideArrow={trendingTemples?.length > 4 ? false : true}>

                            {trendingTemples.map((temple, index) => (


                                <Carousel.Item key={index}>
                                    <ListingCard
                                        key={index} temple={temple}
                                    />
                                </Carousel.Item>

                            ))}

                            {trendingTemples.length > 8
                                && (
                                    <Carousel.Item >
                                        <div className="h-100 d-flex justify-content-center align-items-center flex-column">


                                            <button onClick={handleViewAllTrendingTemples} className="btn btn-theme-primary">View All Trending Temples</button>
                                        </div>
                                    </Carousel.Item>
                                )}


                        </Carousel>

                    </div>
                </section >
            )

            }

            {
                popularTemples && popularTemples.length > 0 && (
                    <section className="listings">
                        <div className="section-heading line">
                            Based on Popularity
                            <span className="text-sm d-block mx-2 fw-light text-grey-light">
                                Donate to the temples based on popularity
                            </span>
                        </div>

                        <div className="listing-container row">
                            {/* eslint-disable-next-line */}
                            <Carousel cols={4} rows={1} gap={0} loop hideArrow={popularTemples?.length > 4 ? false : true}  >
                                {popularTemples.map((temple, index) => (


                                    <Carousel.Item className="carousel-item-spacing" key={index}>
                                        <ListingCard
                                            key={index} temple={temple}
                                        />
                                    </Carousel.Item>

                                ))}

                                {popularTemples.length > 8
                                    && (
                                        <Carousel.Item className="carousel-item-spacing">
                                            <div className="h-100 d-flex justify-content-center align-items-center flex-column">


                                                <button onClick={handleViewAllPopularTemples} className="btn btn-theme-primary">View All Popular Temples</button>
                                            </div>
                                        </Carousel.Item>
                                    )}
                            </Carousel>


                        </div>
                    </section>
                )
            }

            {
                recentlyCreatedTemples && recentlyCreatedTemples.length > 0 && (
                    <section className="listings">
                        <div className="section-heading line">
                            Recently Created
                            <span className="text-sm d-block mx-2 fw-light text-grey-light">
                                Donate to the recently added temples
                            </span>
                        </div>

                        <div className="listing-container row">
                            {/* eslint-disable-next-line */}
                            <Carousel cols={4} rows={1} gap={0} loop hideArrow={recentlyCreatedTemples?.length > 4 ? false : true}>
                                {recentlyCreatedTemples.map((temple, index) => (


                                    <Carousel.Item key={index}>
                                        <ListingCard
                                            key={index} temple={temple}
                                        />
                                    </Carousel.Item>

                                ))}
                                {recentlyCreatedTemples.length > 8
                                    && (
                                        <Carousel.Item >
                                            <div className="h-100 d-flex justify-content-center align-items-center flex-column">


                                                <button onClick={handleViewAllRecentCreatedTemples} className="btn btn-theme-primary">View All Recent Created Temples</button>
                                            </div>
                                        </Carousel.Item>)}

                            </Carousel>

                        </div>
                    </section>

                )
            }
            {loading && <LoadingSpinner />}
        </>
    )
}

export default TrendingPopularRecentlyCreatedTemples