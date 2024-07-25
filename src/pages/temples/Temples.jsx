import axios from "axios";
import Layout from "../../components/layout/Layout";
import ListingCard from "../../components/listingCard/ListingCard";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./temples.css";
import HashLoader from "react-spinners/HashLoader";
import { getQueryParams } from "../../utils/getQueryParams";
import { useSearch } from "../../context/SearchContext";
import { set } from "zod";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { debounce } from 'lodash';

const Temples = () => {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();





  const [temples, setTemples] = useState([]);
  const [popularTemples, setPopularTemples] = useState([])
  const [recentlyCreatedTemples, setRecentlyCreatedTemples] = useState([])

  const [showFilters, setShowFilters] = useState(false);


  const toggleFilters = () => {
    showFilters ? setShowFilters(false) : setShowFilters(true);
  }


  // for searching and filtering 
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  // const [fullLoading, setFullLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [statesOfTemple, setStatesOfTemple] = useState([]);

  const [filters, setFilters] = useState({
    templeName: searchParams.get('templeName') || '',
    typeOfOrganization: searchParams.get('typeOfOrganization') || '',
    address: searchParams.get('address') || '',
    state: searchParams.get('state') || '',
    city: searchParams.get('city') || ''
  });

  const [sortOption, setSortOption] = useState(searchParams.get('sortOption') || '');

  const fetchTemples = async (reset = false) => {

    if (loading || (!hasMore && !reset)) return; // Prevent additional fetches if already loading or no more temples

    setLoading(true); // Set loading to true before the API call
    // setFullLoading(true);

    try {
      const response = await axios.post(`${api}/temple/filter-temples`, {
        page: reset ? 1 : page,
        ...filters,
        sortOption,
      });
      if (response.data.success) {
        setTemples((prevTemples) => reset ? response.data.data.temples : [...prevTemples, ...response.data.data.temples]);
        setPage((prevPage) => reset ? 2 : prevPage + 1); // Increment page number for the next fetch
        setHasMore(response.data.data.temples.length > 0); // Set hasMore based on the response
      } else {
        toast.error(response.data.message);
        setHasMore(false); // No more data to load if the response is unsuccessful
      }
    } catch (error) {
      console.error('Error fetching temples:', error);
      setHasMore(false); // Stop trying to fetch if there's an error
    } finally {
      setLoading(false); // Set loading to false after the API call
      // setFullLoading(false);
    }
  };

  // const fetchTemples = useCallback(debounce(fetchTemplesFunction, 2000), [filters, sortOption]);


  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
    setFilters({
      templeName: '',
      typeOfOrganization: '',
      address: '',
      state: '',
      city: ''
    });
    setSortOption('');

  }


  useEffect(() => {
    const queryParams = getQueryParams();
    const filtersFromQuery = {
      templeName: queryParams.get('templeName') || '',
      typeOfOrganization: queryParams.get('typeOfOrganization') || '',
      address: queryParams.get('address') || '',
      state: queryParams.get('state') || '',
      city: queryParams.get('city') || ''
    };
    const sortOptionFromQuery = queryParams.get('sortOption') || '';

    setFilters(filtersFromQuery);
    setSortOption(sortOptionFromQuery);
  }, [searchParams]);


  const fetchStates = async () => {

    const res = await axios.get(`${api}/temple/get-states-of-temples`);
    setStatesOfTemple(res.data.data);
  }

  // Function to handle scroll event
  const handleScroll = () => {
    // setLoading(true);
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      // setLoading(false);
      fetchTemples();

    }
  };


  const fetchPopularTemples = async () => {
    try {
      const response = await axios.post(`${api}/temple/filter-temples`, { sortOption: 'mostPopular' });
      if (response.data.success) {
        setPopularTemples(response.data.data.temples);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching filtered temples:', error);
    }
  };

  const fetchRecentlyCreatedTemples = async () => {
    try {
      const response = await axios.post(`${api}/temple/filter-temples`, { sortOption: 'recentlyAdded' });
      if (response.data.success) {
        setRecentlyCreatedTemples(response.data.data.temples);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching filtered temples:', error);
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Remove event listener on unmount
  }, [loading]);

  // Fetch temples when filters or sortOption change
  useEffect(() => {
    fetchStates();
    fetchTemples(true); // Fetch with reset = true
  }, [filters, sortOption]);


  // useEffect(() => {
  //   const queryParams = getQueryParams();
  //   const filtersFromQuery = {
  //     templeName: queryParams.get('templeName') || '',
  //     typeOfOrganization: queryParams.get('typeOfOrganization') || '',
  //     address: queryParams.get('address') || '',
  //     state: queryParams.get('state') || '',
  //     city: queryParams.get('city') || ''
  //   };
  //   const sortOptionFromQuery = queryParams.get('sortOption') || '';

  //   setFilters(filtersFromQuery);
  //   setSortOption(sortOptionFromQuery);
  //   fetchTemples(true); // Fetch with reset = true

  // }, []);

  useEffect(() => {
    fetchPopularTemples();
    // fetchRecentlyCreatedTemples();

  }, []);

  const handleWindowResize = () => {
    if (window.innerWidth > 1200) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    handleWindowResize(); // Check initial window width
    window.addEventListener('resize', handleWindowResize); // Add event listener for window resize
    return () => window.removeEventListener('resize', handleWindowResize); // Remove event listener on unmount
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({});
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSortOption = (option) => {
    setSortOption(option);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams();

    // Check if there are any filter values or sort options
    const hasFilterValues = Object.values(filters).some(value => value);
    const hasSortOption = !!sortOption;

    if (hasFilterValues || hasSortOption) {
      for (const key in filters) {
        if (filters[key]) {
          newSearchParams.set(key, filters[key]);
        }
      }

      if (sortOption) {
        newSearchParams.set('sortOption', sortOption);
      }

      setSearchParams(newSearchParams);
      window.scrollTo(0, 0);
      navigate({
        search: newSearchParams.toString()
      });
    } else {
      // If neither filters nor sort option are set, clear the search parameters
      setSearchParams('');
      window.scrollTo(0, 0);
      navigate({
        search: ''
      });
    }
  };

  const fetchDonationInLast30Days = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/donation/fetch-donation-last-30-days`);
      console.log(res.data.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDonationInLast30Days();
  }, []);

  return (
    <Layout title="Temples - Donate Now | SevaSangam" description="SevaSangam is a platform that connects devotees with temples and
            trusts. We aim to make temple donations transparent, easy, and
            accessible to all.">

      <section className="banner p-4" >
        <div className="banner-text">
          <h2 className="text-heading">Temples</h2>
          <p className="text-md text-grey-dark">
            SevaSangam is a platform that connects devotees with temples and
            trusts. We aim to make temple donations transparent, easy, and
            accessible to all.
          </p>
        </div>
      </section>




      <section className="py-0 pt-4">
        <div className="filter-container">
          {/* <div className="d-flex justify-content-end">
            <button type="button" onClick={toggleFilters} className={`btn btn-theme-primary ${showFilters ? 'mb-3' : 'm-0'}`}>{showFilters ? 'Hide Filters' : 'Show Filters'}</button>
          </div> */}
          {(
            <form className="row justify-content-end g-4" onSubmit={handleFilterSubmit}>
              {showFilters == true &&
                <>

                  <div className="col-md-4">
                    <div className="sort-buttons d-flex align-items-center">
                      <button type="button" style={{ fontSize: "14px", border: "1px solid var(--color-theme-primary)" }}
                        className={`btn ${sortOption === 'mostPopular' ? 'btn-theme-primary' : 'btn-outline-theme-primary'}`}
                        onClick={() => handleSortOption('mostPopular')}
                      >
                        Most Popular
                      </button>
                      <button type="button" style={{ fontSize: "14px", border: "1px solid var(--color-theme-primary)" }}
                        className={`btn ${sortOption === 'recentlyAdded' ? 'btn-theme-primary' : 'btn-outline-theme-primary'} ms-2`}
                        onClick={() => handleSortOption('recentlyAdded')}
                      >
                        Recently Added
                      </button>
                      <button type="button" style={{ fontSize: "14px", border: "1px solid var(--color-theme-primary)" }}
                        className={`btn ${sortOption === 'trending' ? 'btn-theme-primary' : 'btn-outline-theme-primary'} ms-2`}
                        onClick={() => handleSortOption('trending')}
                      >
                        Trending Temples
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      className="form-control"
                      name="templeName"
                      placeholder="Temple Name"
                      value={filters.templeName}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Address"
                      value={filters.address}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-select"
                      name="state"
                      value={filters.state}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select State</option>
                      {statesOfTemple && statesOfTemple.map((state, index) => (

                        <option key={index} value={state}>{state}</option>
                      ))}

                    </select>
                  </div>
                </>

              }

              <div className="col-md-2">
                <button type="button" onClick={toggleFilters} className={`btn-filter-toggle btn-md btn-theme-primary`}> <i className="fa fa-filter"></i>  {showFilters ? 'Hide Filters' : 'Show Filters'}</button>
                {showFilters && (

                  <>
                    <button type="button" onClick={resetFilters} className={`btn-filter-toggle btn-md btn-theme-primary`}> <i className="fa-solid fa-rotate-left"></i> Reset </button></>

                )}


              </div>
              {/* <div className="col-md-2">
              <select
                className="form-select"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
              >
                <option value="">Select City</option>
             
              </select>
            </div> */}
              {/* <div className="col-md-1">
              <div className="d-flex justify-content-end m-0 p-0">
                <button type="submit" className="btn btn-theme-primary"><i className="fa-solid fa-filter"></i></button>
              </div>
            </div> */}
            </form>)}

        </div>
      </section>

      <section className=" pt-0">
        <div className="temples-page m-auto row">
          {searchParams.get('templeName') && (
            (temples.length > 0) ? (
              <p className="text-muted mt-2"> Search results for &quot;<strong>{searchParams.get('templeName')}</strong>&quot;</p>
            ) : (<p className="text-muted mt-2"> No results for &quot;{searchParams.get('templeName')}&quot; | Donate to <strong>Most Popular Temples</strong> below <i className="fa-solid fa-arrow-down"></i></p>)
          )

          }


          {temples && temples.length > 0 ?
            <>
              {temples.map((temple, index) => (
                <div className="col-lg-3 col-md-4 mb-4" key={index}>
                  <ListingCard temple={temple} />
                </div>
              ))}

            </>
            :
            <>

              {popularTemples?.map((temple, index) => (
                <div className="col-lg-3 col-md-4 mb-4" key={index}>
                  <ListingCard temple={temple} />
                </div>
              ))}

            </>
          }

        </div>
        {loading && (
          <section className="d-flex justify-content-center m-auto">
            <HashLoader color={"#ff395c"} />
          </section>
        )}




      </section>
      {/* {fullLoading && <LoadingSpinner />} */}
    </Layout >
  );
};

export default Temples;