import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

MapAutoComplete.propTypes = {
  children: PropTypes.node,
  onPlaceChanged: PropTypes.func,
};

const OLA_MAPS_API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY;
const OLA_MAPS_API_URL = "https://api.olamaps.io/places/v1/autocomplete?";
const OLA_MAPS_PLACE_DETAILS_URL =
  "https://api.olamaps.io/places/v1/reverse-geocode?";
const MIN_CHARACTERS = 3;
const AUTO_COMPLETE_DELAY = 500;

export default function MapAutoComplete({ children, onPlaceChanged }) {
  const autoCompleteRef = useRef(null);
  const [autoCompleteTimeout, setAutoCompleteTimeout] = useState(null);
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [inputContainer, setInputContainer] = useState(null);

  const fetchAutoComplete = async (input) => {
    try {
      const response = await axios.get(OLA_MAPS_API_URL, {
        params: {
          input: input,
          api_key: OLA_MAPS_API_KEY,
        },
      });
      setAutoCompleteResults(
        response.data.predictions.filter(
          (v, i, a) => a.findIndex((t) => t.reference === v.reference) === i
        )
      );
    } catch (error) {
      toast.error("Failed to fetch auto complete results");
    }
  };

  useEffect(() => {
    if (!autoCompleteRef.current) return;

    const input = autoCompleteRef.current.querySelector("input");
    if (!input) return;
    setInputContainer(input);
    const inputChangeHandler = async (e) => {
      if (e.target.value.length < MIN_CHARACTERS) return;

      if (autoCompleteTimeout) {
        clearTimeout(autoCompleteTimeout);
      }

      setAutoCompleteTimeout(
        setTimeout(() => {
          fetchAutoComplete(e.target.value);
        }, AUTO_COMPLETE_DELAY)
      );
    };
    input.addEventListener("input", inputChangeHandler);
    return () => {
      input.removeEventListener("input", inputChangeHandler);

      if (autoCompleteTimeout) {
        clearTimeout(autoCompleteTimeout);
      }
    };
  }, [autoCompleteRef, autoCompleteTimeout]);

  const locationSelected = async (resultId) => {
    const selectedResult = autoCompleteResults.find(
      (result) => result.place_id === resultId
    );

    if (!selectedResult) {
      return;
    }

    inputContainer.value = selectedResult.description;
    setAutoCompleteResults([]);

    try {
      const place = await axios.get(OLA_MAPS_PLACE_DETAILS_URL, {
        params: {
          latlng:
            selectedResult.geometry.location.lat +
            "," +
            selectedResult.geometry.location.lng,
          api_key: OLA_MAPS_API_KEY,
        },
      });
      onPlaceChanged(place.data.results[0]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch place details");
    }
  };

  return (
    <div className="olaMApAutoComplete" ref={autoCompleteRef}>
      {children}
      <ul className="resultContainer">
        {autoCompleteResults.map((result) => (
          <li style={{
            border: "1px solid #e0e0e0",
            borderRadius: "0px",
          }} key={result.reference}>
            <button
              onClick={() => {
                locationSelected(result.place_id);
              }}
              type="button"
              style={{
                fontSize: "0.8rem",
                textAlign: "left",

              }}
              className=" p-2 border-bottom-1 border-gray-200 w-full"
            >
              {result.description}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
