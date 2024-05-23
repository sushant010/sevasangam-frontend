import axios from "axios";
import Layout from "../../components/layout/Layout";
import ListingCard from "../../components/listingCard/ListingCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Temples = () => {
  const api = import.meta.env.VITE_API_URL;

  const [temples, setTemples] = useState([]);
  const [filters, setFilters] = useState({
    templeName: '',
    typeOfOrganization: '',
    address: '',
    isVerified: ''
  });

  const fetchTemples = async () => {
    try {
      const response = await axios.get(`${api}/temple/get-temples`);
      if (response.data.success) {
        setTemples(response.data.data.temples);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error creating temple:', error);
    }
  };

  const fetchFilteredTemples = async () => {
    try {
      const response = await axios.post(`${api}/temple/filter-temples`, filters);
      if (response.data.success) {
        setTemples(response.data.data.temples);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching filtered temples:', error);
    }
  };

  useEffect(() => {
    fetchTemples();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchFilteredTemples();
  };

  return (
    <Layout>
      <section className="banner">
        <div className="banner-text">
          <h2 className="text-heading">Temples</h2>
          <p className="text-md fw-bold text-grey-dark">
            SevaSangam is a platform that connects devotees with temples and
            trusts. We aim to make temple donations transparent, easy, and
            accessible to all.
          </p>
          <button className="btn btn-theme-primary">Donate Now</button>
        </div>
      </section>
      <section>
        <div className="container my-4">
          <div className="filter-container">
            <form className="row g-3" onSubmit={handleFilterSubmit}>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  name="templeName"
                  placeholder="Temple Name"
                  value={filters.templeName}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  name="typeOfOrganization"
                  placeholder="Type of Organization"
                  value={filters.typeOfOrganization}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  value={filters.address}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
                <select
                  className="form-select"
                  name="isVerified"
                  value={filters.isVerified}
                  onChange={handleFilterChange}
                >
                  <option value="">Select Verification Status</option>
                  <option value="1">Verified</option>
                  <option value="0">Not Verified</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  name="sortOption"
                  value={filters.sortOption}
                  onChange={handleFilterChange}
                >
                  <option value="">Sort By</option>
                  <option value="mostPopular">Most Popular</option>
                  <option value="recentlyAdded">Recently Added</option>
                </select>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-theme-primary">Apply Filters</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="container my-4">
        <div className="listing-container row">
          {temples && temples.length > 0 ? (
            temples.map((temple, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <ListingCard
                  temple={temple}
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No temples found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Temples;
