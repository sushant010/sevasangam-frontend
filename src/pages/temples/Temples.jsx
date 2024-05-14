import Layout from "../../components/layout/Layout";
import ListingCard from "../../components/listingCard/ListingCard";

const Temples = () => {
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
          <ListingCard
        title="Rameshwaram Temple"
        location="Mumbai, India"
        donation="₹ 2,25,232 Donated in last 30 days"
              />
                <ListingCard
        title="Rameshwaram Temple"
        location="Mumbai, India"
        donation="₹ 2,25,232 Donated in last 30 days"
              />
                <ListingCard
        title="Rameshwaram Temple"
        location="Mumbai, India"
        donation="₹ 2,25,232 Donated in last 30 days"
              />
                <ListingCard
        title="Rameshwaram Temple"
        location="Mumbai, India"
        donation="₹ 2,25,232 Donated in last 30 days"
              />
                        <ListingCard
        title="Rameshwaram Temple"
        location="Mumbai, India"
        donation="₹ 2,25,232 Donated in last 30 days"
      />
            
          </div>
          

    </Layout>
  );
};

export default Temples;
