// selectComponentWithSearch.jsx

import { useEffect, useRef, useState } from "react";

import axios from "axios";

export default function SelectComponentWithSearch() {
  const [selectData, setSelectData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const inputChange = (e) => {
    const searchValue = e.target.value;

    setSelectData([]);
    if (searchValue.length < 3) return;

    setSearchData(searchValue);
  };

  useEffect(() => {
    if (searchData === "") return;
    setErrorMessage("");
    const fetchTemples = async () => {
      setLoading(true);
      const api = import.meta.env.VITE_API_URL;

      try {
        const fetchData = await axios.get(
          `${api}/temple/search-temple-by-name`,
          {
            params: {
              search: searchData,
            },
          }
        );

        setSelectData(fetchData.data.data.temples);
      } catch (err) {
        if (err.response?.data?.message) {
          return setErrorMessage(err.response.data.message);
        }
        setErrorMessage("Error in fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchTemples();
  }, [searchData]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter 3 digits to search"
        onChange={inputChange}
        ref={inputRef}
        className="form-control position-relative"
        name="temple"
      />

      {(loading || errorMessage || (selectData && selectData.length > 0)) && (
        <ul className="position-absolute bg-white border border-1 border-dark mt-1" style={{
          width:"fitContent"
        }}>
          {loading && <li className="spinner-border" role="status"></li>}
          {errorMessage && <li>{errorMessage}</li>}
          {selectData.map((data) => (
            <li
              key={data._id}
              onClick={() => {
                inputRef.current.value = data.templeName;
                setSelectData([]);
              }}
              className="cursor-pointer mt-1 p-1 border-bottom border-1 border-dark" 
              role="button"
            >
              {data.templeName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
