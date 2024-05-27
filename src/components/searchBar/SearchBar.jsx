import './searchBar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const SearchBar = ({ inHomepage = false, handleSearchSubmitOnHomepage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  // Debounce function to limit the rate of API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const fetchSuggestions = async (term) => {
    if (term) {
      try {
        const res = await axios.get(`${api}/temple/search-temple-suggestions`, {
          params: { search: term }
        });
        if (res.data.success) {
          console.log(res.data.data)
          setSuggestions(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedFetchSuggestions(term);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };


  const handleSearchSubmit = (id) => {
    if (inHomepage && handleSearchSubmitOnHomepage) {
      handleSearchSubmitOnHomepage(id);
    } else {
      const formattedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, '+');
      const formattedLocation = location.toLowerCase().replace(/\s+/g, '+');
      navigate(`/temple/${id}`);
    }
  };


  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    // fetchLocation()
  }, []);

  return (
    <div>
      <div className='searchbar-container'>
        <div className="location-select">
          <i className="fa-solid fa-location-dot"></i>
          <input
            list="locations"
            name="locations"
            id="locations"
            value={location}
            onChange={handleLocationChange}
          />
          <datalist id="locations">
            <option value="">All Locations</option>
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            {/* Add more location options if needed */}
          </datalist>
        </div>
        <div className="search-input">
          <i className="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSearchSubmit(suggestion._id)}>
                  {suggestion.templeName.length > 15 ? suggestion.templeName.slice(0, 15) + '...' : suggestion.templeName}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
      {/* Add your search results display here */}
    </div>
  );
};
SearchBar.propTypes = {
  inHomepage: PropTypes.bool,
  handleSearchSubmitOnHomepage: PropTypes.func
};

export default SearchBar;
