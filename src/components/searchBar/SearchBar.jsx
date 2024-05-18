import './searchBar.css';
import { useEffect, useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // Add your search logic here
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        // Add your location logic here
        fetchLocation()
    };


    const fetchLocation = () => {
        if ("geolocation" in navigator) {
            // Geolocation is available
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
            // Geolocation is not available
            console.log("Geolocation is not supported by your browser.");
          }

    }
    useEffect(() => {
       
        // fetchLocation()

    })
    
    return (
        <div>
            <div className='searchbar-container'>
                <div className="location-select">
                    <i className="fa-solid fa-location-dot"></i>
                    <input list="locations" name="locations" id="locations"/>
                <datalist id="locations" value={location} onChange={handleLocationChange}>
                  <option value="">All Locations</option>
                  <option value="Location 1">Location 1</option>
                  <option value="Location 2">Location 2</option>
                  {/* Add more location options if needed */}
                </datalist>
                    </div>
                <div className="search-input">
                <i className="fa-solid fa-search"></i>
                <input className=''
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    />
                    </div>
            </div>
            {/* Add your search results display here */}
        </div>
    );
};

export default SearchBar;