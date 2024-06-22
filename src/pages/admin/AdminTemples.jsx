import { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import { Link } from "react-router-dom";

import ListingCardAdmin from "../../components/listingCardAdmin/ListingCardAdmin";
import { useAdminTemples } from "../../context/AdminTemples";

import axios from "axios";
import { toast } from "react-toastify";
import SelectComponentWithSearchForTempleName from "../../components/selectComponentWithSearch/SelectComponentWithSearchForTempleName";
import SelectComponentWithSearchForCreator from "../../components/selectComponentWithSearch/selectComponentWithSearchForCreator";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const AdminTemples = () => {
  const api = import.meta.env.VITE_API_URL;
  const [auth] = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [adminTemples, setAdminTemples] = useAdminTemples();
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({

    temple: searchParams.get("temple") || "",
    templeCreatedBy: searchParams.get("templeCreatedBy") || "",
    verified: searchParams.get("verified") || "",
  });

  const fetchTemplesByAdmin = async () => {
    localStorage.removeItem("adminTemples");
    if (auth.user.role == 1) {
      try {
        const response = await axios.post(
          `${api}/temple/get-temples-by-admin`,
          {
            templeName: filters.temple,
            verified: filters.verified,
            userId: auth.user._id
          },
        );

        if (response.data.success) {
          setAdminTemples(response.data.data.temples);
          localStorage.setItem(
            "adminTemples",
            JSON.stringify(response.data.data.temples)
          );
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error creating temple:", error);
      }
    } else {
      try {
        const response = await axios.get(`${api}/temple/get-temples`, {
          params: {

            templeName: filters.temple,
            templeCreatedBy: filters.templeCreatedBy,
            verified: filters.verified,
          }
        });

        if (response.data.success) {
          setAdminTemples(response.data.data.temples);
          localStorage.setItem(
            "adminTemples",
            JSON.stringify(response.data.data.temples)
          );
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error creating temple:", error);
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await fetchTemplesByAdmin();
    setLoading(false);
  };


  useEffect(() => {
    fetchData();
  }, [filters, setAdminTemples]);

  const filterSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = {}
    formData.forEach((value, key) => {
      data[key] = value
    })
    setFilters(data)
    setSearchParams(new URLSearchParams(data))
  }

  return (
    <Layout>
      <>
        {loading && <LoadingSpinner />}
        <section>
          <div className="section-heading">
            {auth.user.role == 2 ? "All Temples" : "Temples Added by you"}
          </div>
          {/* Filter section */}

          <div className="filter-container my-4">
            <form className="row g-4" onSubmit={filterSubmit}>
              <div className="col-md-4">
                <SelectComponentWithSearchForTempleName />
              </div>
              {/* <div className="col-md-4">
            <SelectComponentWithSearchForCreator />
          </div> */}
              {
                auth.user.role == 2 && (
                  <div className="col-md-4">
                    <SelectComponentWithSearchForCreator />
                  </div>
                )
              }
              {/* Verified or not */}
              <div className="col-md-2">
                <select className="form-select" name="verified" >
                  <option value="1">Verified</option>
                  <option value="0">Not Verified</option>
                  <option value={""}>All</option>
                </select>
              </div>

              <div className="col-md-1 flex-column align-items-center justify-content-center">
                <button type="submit" className="btn btn-theme-primary">
                  <i className="fa-solid fa-filter"></i>
                </button>
              </div>



            </form>

          </div>
          {!adminTemples && <div className="loader"></div>}
          <div className="listing-container m-auto" style={{ minHeight: "10px" }}>
            {adminTemples &&
              adminTemples.length > 0 &&
              adminTemples.map((temple, index) => {
                return <ListingCardAdmin key={index} temple={temple} />;
              })}
          </div>

          {adminTemples && adminTemples.length === 0 && (
            //   show a message if there are no temples and  show the add temple button
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h3 className=" pb-2">No Temples Found!</h3>
              <Link
                to={
                  auth.user.role == 2
                    ? "/superadmin/add-temple"
                    : "/admin/add-temple"
                }
                className="btn btn-theme-primary"
              >
                Add Temple
              </Link>
            </div>
          )}
        </section>
        {!adminTemples && (<p>No Temple exist</p>)}
      </>
    </Layout>
  );
};

export default AdminTemples;