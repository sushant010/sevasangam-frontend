// selectComponentWithSearch.jsx

import { useEffect, useRef, useState } from "react";

import axios from "axios";
// import "./selectStyle.css"

export default function SelectComponentWithSearchForTempleName() {
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
    <div className="position-relative">
      <input
        type="text"
        placeholder="Temple Name"
        onChange={inputChange}
        ref={inputRef}
        className="form-control position-relative"
        name="temple"
      />

      {(loading || errorMessage || (selectData && selectData.length > 0)) && (
        <ul className="position-absolute bg-white  shadow" style={{
          width: "100%",
          zIndex: 100,
          backgroundColor: "white",
          borderRadius: "5px",
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
              className="cursor-pointer px-2 py-1"


              role="button"
              style={{
                backgroundColor: "#f5f5f5",
                fontSize: "14px",
                borderBottom: "1px solid #ccc",
                width: "100%",

              }}
            >
              {data.templeName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
