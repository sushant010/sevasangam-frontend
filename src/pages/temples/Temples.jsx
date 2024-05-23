import axios from "axios";
import Layout from "../../components/layout/Layout";
import ListingCard from "../../components/listingCard/ListingCard";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./temples.css";

const Temples = () => {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [temples, setTemples] = useState([]);
  const [filters, setFilters] = useState({
    templeName: searchParams.get('templeName') || '',
    typeOfOrganization: searchParams.get('typeOfOrganization') || '',
    address: searchParams.get('address') || '',
    state: searchParams.get('state') || '',
    city: searchParams.get('city') || ''
  });
  const [sortOption, setSortOption] = useState(searchParams.get('sortOption') || '');

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await axios.post(`${api}/temple/filter-temples`,
          Object.fromEntries([...searchParams])
        );
        if (response.data.success) {
          setTemples(response.data.data.temples);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching temples:', error);
      }
    };

    fetchTemples();
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSortOption = (option) => {
    setSortOption(option);
    const newSearchParams = new URLSearchParams({
      ...Object.fromEntries([...searchParams]),
      sortOption: option
    });
    setSearchParams(newSearchParams);
    navigate({
      search: newSearchParams.toString()
    });
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
                <button style={{ fontSize: "14px", border: "1px solid var(--color-theme-primary)" }}
                  className={`btn ${sortOption === 'mostPopular' ? 'btn-theme-primary' : 'btn-outline-theme-primary'}`}
                  onClick={() => handleSortOption('mostPopular')}
                >
                  Most Popular
                </button>
                <button style={{ fontSize: "14px", border: "1px solid var(--color-theme-primary)" }}
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
            <div className="col-md-1">
              <div className="d-flex justify-content-end m-0 p-0">
                <button type="submit" className="btn btn-theme-primary"><i className="fa-solid fa-filter"></i></button>
              </div>
            </div>
          </form>

        </div>
      </section>

      <section className="m-auto pt-0">
        <div className="listing-container m-auto row">
          {temples && temples.length > 0 ? (
            temples.map((temple, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <ListingCard temple={temple} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No temples found.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Temples;
