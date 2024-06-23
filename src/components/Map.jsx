import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropTypes from "prop-types";
const containerStyle = {
    width: '100%',
    height: '400px'
};

const Map = ({ address }) => {
    const google_map_api = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });


    useEffect(() => {
        const doFetching = async () => {
            console.log("Geocoding address:", address);

            if (!address || address.trim() === "") {
                console.error("Invalid address provided");
                return;
            }

            const geocodeAddress = (address) => {
                return new Promise((resolve, reject) => {
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ address }, (results, status) => {
                        if (status === 'OK') {
                            resolve(results[0].geometry.location);
                        } else {
                            reject(`Geocode was not successful for the following reason: ${status}`);
                        }
                    });
                });
            };

            try {
                const location = await geocodeAddress(address);
                setMapCenter({ lat: location.lat(), lng: location.lng() });
            } catch (error) {
                console.error(error);
            }
        };

        doFetching();
    }, [address]);


    return (
        <LoadScript googleMapsApiKey={google_map_api}>
            <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={14}>
                <Marker position={mapCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;

Map.propTypes = {
    address: PropTypes.string.isRequired
};

