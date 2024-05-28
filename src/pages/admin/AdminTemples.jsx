import { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import Button from "../../components/buttons/Button";

import ListingCardAdmin from "../../components/listingCardAdmin/ListingCardAdmin";
import { useAdminTemples } from "../../context/AdminTemples";

import axios from "axios";
import toast from "react-hot-toast";

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
          // toast.success(response.data.message);
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
          // toast.success(response.data.message);
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

  return (
    <Layout >
      <section className="m-auto">
        {/* <div className="listing-container">

                    {adminTemples && adminTemples.length > 0 && adminTemples.map((temple, index) => {
                        return <ListingCardAdmin key={index} temple={temple} />
                    })}

                </div> */}
        {!adminTemples && <div className="loader"></div>}
        {adminTemples && adminTemples.length === 0 && (
        //   show a message if there are no temples and  show the add temple button
            <div 
            
            className="d-flex flex-column align-items-center justify-content-center"
            >
                <h3 className=" pb-2">No Temples Found!</h3>
                <Button text="Add Temple" link="/admin/add-temple" />
            </div>
        )}
      </section>
    </Layout>
  );
};

export default AdminTemples;
