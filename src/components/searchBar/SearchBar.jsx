import './searchBar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSearch } from '../../context/SearchContext';

const SearchBar = ({ inHomepage = false, handleSearchSubmitOnHomepage }) => {
  const { searchParams, setSearchParams } = useSearch();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('templeName') || '');
  const [locationSearchTerm, setLocationSearchTerm] = useState(searchParams.get('address') || '');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [statesOfTemple, setStatesOfTemple] = useState([]);
  const [citiesOfTemple, setCitiesOfTemple] = useState([]);
  const [locationSuggestion, setLocationSuggestion] = useState([]);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;


  const fetchSuggestions = async (term) => {
    if (term) {
      try {
        const res = await axios.get(`${api}/temple/search-temple-suggestions`, {
          params: { search: term }
        });
        if (res.data.success) {
          setSuggestions(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchSuggestions(term);
  };


  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    console.log(selectedLocation);

    if (statesOfTemple?.length > 0) {
      const suggestionsStates = statesOfTemple.filter((state) => {
        console.log(state);
        return state.toLowerCase().includes(selectedLocation.toLowerCase());
      });
      const suggestionsCities = citiesOfTemple.filter((state) => {
        console.log(state);
        return state.toLowerCase().includes(selectedLocation.toLowerCase());
      });

      const set = new Set([...suggestionsStates, ...suggestionsCities]);
      const suggestions = [...set];
      setLocationSuggestion(suggestions);
      console.log('Suggestions:', suggestions);
    } else {
      setLocationSuggestion([]);
      console.log('No states found.');
    }
  };

  const handleLocationSuggestionClick = (location) => {
    const formattedLocation = location ? location.toLowerCase().replace(/\s+/g, '+') : '';
    navigate(`/temples?templeName=${searchTerm}${formattedLocation ? `&address=${formattedLocation}` : ''}`);
  }

  const fetchStates = async () => {
    const res = await axios.get(`${api}/temple/get-states-of-temples`);
    setStatesOfTemple(res.data.data);
  };

  const fetchCities = async () => {
    const res = await axios.get(`${api}/temple/get-cities-of-temples`);
    setCitiesOfTemple(res.data.data);
  };


  useEffect(() => {
    fetchStates();
    fetchCities()
  }, []);

  const handleSearchSubmit = () => {
    if (inHomepage && handleSearchSubmitOnHomepage) {
      handleSearchSubmitOnHomepage(searchTerm, location);
    } else {
      // if (window.location.pathname === '/temples') {
      //   window.location.reload();
      // } else {
      const formattedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, '+');
      const formattedLocation = location ? location.toLowerCase().replace(/\s+/g, '+') : '';
      window.scrollTo(0, 0);
      navigate(`/temples?templeName=${formattedSearchTerm}${formattedLocation ? `&address=${formattedLocation}` : ''}`);


    }
    setSuggestions([]); // Clear suggestions after search
  };

  const handleSuggestionClick = (suggestion) => {

    navigate(`/temple/${suggestion._id}`);
  };



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

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
    fetchLocation();
  }, []);

  return (
    <div>
      <div className='searchbar-container'>
        <div className="location-select">
          <i className="fa-solid fa-location-dot"></i>
          <input
            list="locations"
            name="locations"
            placeholder="Location"
            id="locations"
            value={location}
            onChange={handleLocationChange}
            onKeyPress={handleKeyPress}
          />
          {location && locationSuggestion && locationSuggestion.length > 0 && (
            <ul className="suggestions-list">

              {locationSuggestion.map((suggestion, index) => (
                <li key={index} onClick={() => handleLocationSuggestionClick(suggestion)}>
                  <p>{suggestion}</p>
                </li>
              ))}
            </ul>
          )}

        </div>
        <div className="search-input">
          {/* <i className="fa-solid fa-gopuram"></i> */}
          <i className="fa-solid fa-synagogue"></i>
          <input
            type="text"
            placeholder="Name"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />

          {searchTerm && searchTerm.length > 0 && (
            <ul className="suggestions-list">
              <li className='d-flex justify-content-between' onClick={handleSearchSubmit}>
                <p>Show All Results with &quot;{searchTerm}&quot; </p>
              </li>
              {suggestions && suggestions.length > 0 && suggestions.map((suggestion, index) => (
                <li className='d-flex justify-content-between' style={{ gap: "6px" }} key={index} onClick={() => handleSuggestionClick(suggestion)}>

                  <p>{suggestion.templeName.length > 15 ? suggestion.templeName.slice(0, 15) + '...' : suggestion.templeName}</p>
                  <p style={{ color: "#BEBEBE", fontSize: "12px" }}>{suggestion.location.city}, {suggestion.location.state}</p>
                </li>
              ))}
            </ul>
          )}



        </div>
        <button className="btn btn-theme-primary search-button" onClick={handleSearchSubmit}>
          <i className="fa-solid fa-search"></i>
        </button>
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
