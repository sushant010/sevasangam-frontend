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

const AdminTemples = () => {
  const api = import.meta.env.VITE_API_URL;
  const [auth] = useAuth();

  const [adminTemples, setAdminTemples] = useAdminTemples();

  const fetchTemplesByAdmin = async () => {
    localStorage.removeItem("adminTemples");
    if (auth.user.role == 1) {
      const userId = auth?.user?._id;
      try {
        const response = await axios.post(
          `${api}/temple/get-temples-by-admin`,
          { userId: userId }
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
        const response = await axios.get(`${api}/temple/get-temples`);

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

  useEffect(() => {
    fetchTemplesByAdmin();
  }, []);

  const filterSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <Layout>
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
          <div className="col-md-4">
            <SelectComponentWithSearchForCreator />
          </div>
          {/* Verified or not */}
          <div className="col-md-3">
            <select className="form-select" name="verified" >
              <option value="0">Verified</option>
              <option value="1">Not Verified</option>
            </select>
          </div>
          {/* Created after */}
          <div className="col-md-3">
            <label htmlFor="createdAfter" className="form-label"> Created After</label>
            <input type="date" className="form-control" name="createdAfter" />
          </div>
          {/* Created before */}
          <div className="col-md-3">
            <label htmlFor="createdBefore" className="form-label"> Created Before</label>
            <input type="date" className="form-control" name="createdBefore" />
          </div>

          <div className="col-md-3 flex-column align-items-center justify-content-center">
            <button type="submit" className="btn btn-theme-primary">
              Search
            </button>
          </div>



        </form>

      </div>
        {!adminTemples && <div className="loader"></div>}
        <div className="listing-container m-auto">
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
    </Layout>
  );
};

export default AdminTemples;
