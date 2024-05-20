import axios from "axios";
import Layout from "../../components/layout/Layout";
import ListingCard from "../../components/listingCard/ListingCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Temples = () => {

  const api = import.meta.env.VITE_API_URL;

  const [temples, setTemples] = useState([])


  const fetchTemples = async () => {

    try {
      const response = await axios.get(`${api}/temple/get-temples`);

      if (response.data.success) {

        setTemples(response.data.data.temples)

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error('Error creating temple:', error);
    }

  };

  useEffect(() => {

    fetchTemples()

  }, [])

  return (
    <Layout>
      <section className="banner">
        <div className="banner-text">
          <h2 className="text-heading">Temples</h2>
          <p className="text-md fw-bold text-grey-dark">
            SevaSangam is a platform that connects devotees with temples and
            trusts. We aim to make temple donations transparent, easy, and
            accessible to all.
          </p>
          <button className=" btn primary">Donate Now</button>
        </div>
      </section>

      <div className="listing-container center">
        {temples && temples.length > 0 && temples.map((temple, index) => (


          <ListingCard
            key={index} title={temple.templeName}
            location={temple.location.address + temple.location.country}
            donation={`₹ ${temple.donation} Donated in last 30 days`}
          />


        ))}



      </div>


    </Layout>
  );
};

export default Temples;
