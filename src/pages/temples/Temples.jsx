import axios from "axios";
import Layout from "../../components/layout/Layout";
import ListingCard from "../../components/listingCard/ListingCard";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./temples.css";
import HashLoader from "react-spinners/HashLoader";

const Temples = () => {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


  const [temples, setTemples] = useState([]);


  // for searching and filtering 
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
    }
  };

  // Function to handle scroll event
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      fetchTemples(); // Fetch more temples when scrolled to the bottom
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Remove event listener on unmount
  }, [loading]);

  // Fetch temples when filters or sortOption change
  useEffect(() => {
    fetchTemples(true);
  }, [filters, sortOption]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
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
      navigate({
        search: newSearchParams.toString()
      });
    } else {
      // If neither filters nor sort option are set, clear the search parameters
      setSearchParams('');
      navigate({
        search: ''
      });
    }
  };

  return (
    <Layout>
      <section className="banner p-4" style={{ minHeight: "200px" }}>
        <div className="banner-text">
          <h2 className="text-heading">Temples</h2>
          <p className="text-md fw-bold text-grey-dark">
            SevaSangam is a platform that connects devotees with temples and
            trusts. We aim to make temple donations transparent, easy, and
            accessible to all.
          </p>
        </div>
      </section>

      <section>
        <div className="filter-container">
          <form className="row g-4" onSubmit={handleFilterSubmit}>
            <div className="col-md-2">
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
            {/* <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                name="typeOfOrganization"
                placeholder="Type of Organization"
                value={filters.typeOfOrganization}
                onChange={handleFilterChange}
              />
            </div> */}
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
                {/* Add state options here */}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
              >
                <option value="">Select City</option>
                {/* Add city options here */}
              </select>
            </div>
            {/* <div className="col-md-1">
              <div className="d-flex justify-content-end m-0 p-0">
                <button type="submit" className="btn btn-theme-primary"><i className="fa-solid fa-filter"></i></button>
              </div>
            </div> */}
          </form>
        </div>
      </section>

      <section className=" pt-0">
        <div className="listing-container m-auto row">
          {temples && temples.length > 0 ? (
            temples.map((temple, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <ListingCard temple={temple} />
              </div>
            ))
          ) : null}

        </div>
        {loading && (
          <section className="d-flex m-auto">
            <HashLoader color={"#ff395c"} />
          </section>
        )}

      </section>
    </Layout>
  );
};

export default Temples;