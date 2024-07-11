import "./home.css";
import Layout from "../../components/layout/Layout";
import SearchBar from "../../components/searchBar/SearchBar";
import SectionImgWithText from "../../components/sectionImgWithTextDesc/SectionImgWithText";
import SectionBgImgWithGradient from "../../components/sectionBgImgWithGradient/SectionBgImgWithGradient";
import ListingCard from "../../components/listingCard/ListingCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Carousel from 'react-grid-carousel'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { devoteeSteps, templeAdminSteps } from "./steps";
import TrendingPopularRecentlyCreatedTemples from "../../components/TrendingPopularRecentlyCreatedTemples";
import { HashLoader } from "react-spinners";
import { usePopularTemples } from "../../context/PopularTemples";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
function Home() {

  const api = import.meta.env.VITE_API_URL;

  const [showSteps, setShowSteps] = useState("devotee")


  const [popularTemples, setPopularTemples] = usePopularTemples([])

  const [searchTemple, setSearchTemple] = useState([])




  const navigate = useNavigate();

  const query = useQuery();


  useEffect(() => {
    const resetStatus = query.get('reset');
    if (resetStatus === 'success') {
      toast.success('Password reset successfully');
    } else if (resetStatus === 'failure') {
      toast.error('Password reset failed');
    }

    // Remove query parameter after displaying the toast
    if (resetStatus) {
      navigate({
        pathname: window.location.pathname,
        search: '',
      });
    }
  }, [query, navigate]);

  // const fetchImagesOfTemples = async () => {
  //   try {

  //     const res = await axios.get(`${api}/temple/get-images-of-temples`);
  //     if (res.data.success) {
  //       alert("success")
  //       console.log(res.data.templesImages)
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching filtered temples:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchImagesOfTemples();
  // }, []);




  // const [filters, setFilters] = useState({
  //   templeName: '',
  //   address: ''
  // });



  const fetchfilteredTemples = async () => {
    try {

      const response = await axios.post(`${api}/temple/filter-temples`, { limit: 4 });
      if (response.data.success) {

        setSearchTemple(response.data.data.temples);

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching filtered temples:', error);
    }
  };



  const handleSearchSubmitOnHomepage = async (searchTerm, location) => {
    try {
      const res = await axios.post(`${api} / temple / filter - temples`, {
        templeName: searchTerm,
        address: location
      }, { limit: 4 });
      const { data } = res.data;
      if (data.temples.length > 0) {
        setSearchTemple(data.temples);

      } else {


        // const formattedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, '+');
        // const formattedLocation = location ? location.toLowerCase().replace(/\s+/g, '+') : '';
        // window.scrollTo(0, 0);
        // navigate(`/ temples ? templeName = ${ formattedSearchTerm }${ formattedLocation? `&address=${formattedLocation}` : ''}`);
      }

    } catch (error) {
      console.error(error);
      // Handle error, e.g., display a toast message
    }


  }

  // useEffect(() => {
  //   handleSearchSubmitOnHomepage()
  // }, [searchTemple])



  useEffect(() => {
    fetchfilteredTemples();

  }, []);

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     [name]: value
  //   }));
  // };

  // const handleFilterSubmit = (e) => {
  //   e.preventDefault();
  //   fetchFilteredTemples();
  // };


  return (
    <>
      <Layout>

        <SectionBgImgWithGradient bgImg="src/assets/images/temple-banner.jpg" heading="Welcome to SevaSangam - Your Gateway to Spiritual Connection" description="From Clicks to Blessings, SevaSangam's Vision of Empowering Believers and Enriching Temples." />

        <section style={{ marginTop: "-130px" }} id="searchTempleToDonate" className="search-section">
          <h2 className=" text-center m-auto text-primary text-xl fw-bold mb-4">
            Search Temple to Donate..
          </h2>
          <div className="box"></div>
          <div className="search-bar-wrapper">
            <SearchBar inHomepage={true} handleSearchSubmitOnHomepage={handleSearchSubmitOnHomepage} />
          </div>

          <div className="listing-container center home">

            {searchTemple?.length > 0 ? (
              searchTemple.slice(0, 4).map((temple) => (
                <ListingCard
                  key={temple._id} temple={temple}
                />
              ))
            ) : (
              popularTemples?.length > 0 ? (
                <>
                  {popularTemples.slice(0, 4).map((temple) => (
                    <ListingCard
                      key={temple._id} temple={temple}
                    />
                  ))
                  }
                </>
              ) : (
                <>
                  <div className="d-flex align-items-center">
                    <HashLoader color={"#ff395c"} />
                  </div>
                </>
              )
            )}
          </div>
        </section>

        <TrendingPopularRecentlyCreatedTemples></TrendingPopularRecentlyCreatedTemples>

        <section className="numbers">
          <h2 className="section-heading line mb-4">Our Numbers</h2>

          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center gap-4">
              <div>
                <div className="text-heading numbers">10,000+</div>
                <p className="text-medium">Devotees Connected</p>
                <hr></hr>
              </div>
              <div>
                <div className="text-heading numbers">500+</div>
                <p className="text-medium">Temples Supported</p>
                <hr></hr>
              </div>
              <div>
                <div className="text-heading numbers">24/7 </div>
                <p className="text-medium">Support Availability</p>
                <hr></hr>
              </div>
              <div>
                <div className="text-heading numbers">99.9%</div>
                <p className="text-medium">Transaction Success Rate</p>
                <hr></hr>
              </div>
              <div>
                <div className="text-heading numbers">1 Million+</div>
                <p className="text-medium"> Donations Processed
                </p>
                <hr></hr>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              <p className="text-md">
                Join hands with us in upholding tradition, fostering inclusivity
              </p>
              <h2 className="section-heading text-primary">
                How we evolved
              </h2>
              <p className="text-md">
                At SevaSangam, our mission and vision stem from recognizing the evolving needs of our society and the timeless significance of spiritual connection. We saw a unique opportunity to bridge tradition and technology, addressing the challenges devotees face in making donations and payments to temples, especially when physical presence is not feasible.
              </p>
              <p className="text-md">
                In today’s fast-paced world, the need for convenient and secure methods of supporting religious institutions is crucial. Temples are vital in preserving our cultural and spiritual heritage, yet many struggle with financial stability and connecting with the tech-savvy younger generation. Devotees seek meaningful ways to contribute without geographic or time constraints. SevaSangam addresses these needs by providing an accessible, convenient, and transparent platform for donations, ensuring that temples receive the support they need for upkeep, activities, and community services. This digital solution also engages younger generations, making it easier for them to stay connected to their heritage. Through SevaSangam, we harness technology to uphold and enhance spiritual traditions, ensuring the cultural and religious fabric of our society remains strong and vibrant for future generations.
              </p>
              <div className="btns d-flex gap-4">
                <Link className="btn btn-theme-primary" to="/about">About us</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="linear-bg">
          <div className="section-heading line">How it Works</div>


          <div className="capsuleContainer">
            <div className="capsule">
              <button onClick={
                () => setShowSteps("devotee")
              }
                className={showSteps === "devotee" ? "active" : ""}
              >Devotees</button>
              <button onClick={
                () => setShowSteps("admin")
              }
                className={showSteps === "admin" ? "active" : ""}
              >Admins</button>
              <div className={

                showSteps === "devotee" ? "capsuleBack left" : "capsuleBack right"
              }>
              </div>

            </div>


          </div>

          <div className="mt-4 row">
            {
              showSteps === "devotee" && (
                <Carousel cols={4} rows={1} gap="30px" loop>
                  {
                    devoteeSteps.map((step, index) => (
                      <Carousel.Item key={index}>

                        <div className="card">
                          <img
                            src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Card Image"
                            className="card-image"
                          />
                          <div className="card-content">
                            <h2 className="card-title">{step.title}</h2>
                            <p className="card-description">{step.description}</p>
                          </div>

                        </div>
                      </Carousel.Item>
                    ))
                  }

                </Carousel>
              )
            }
            {
              showSteps === "admin" && (
                <Carousel cols={4} rows={1} gap="30px" loop>
                  {
                    templeAdminSteps.map((step, index) => (
                      <Carousel.Item key={index}>

                        <div className="card">
                          <img
                            src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Card Image"
                            className="card-image"
                          />
                          <div className="card-content">
                            <h2 className="card-title">{step.title}</h2>
                            <p className="card-description">{step.description}</p>
                          </div>
                        </div>

                      </Carousel.Item>
                    ))
                  }

                </Carousel>
              )
            }

          </div>
          {/* Content not provided */}

        </section>
        <SectionImgWithText
          title="Our Donators"
          img1="https://plus.unsplash.com/premium_photo-1678693021499-c6c5111bbc74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          img2="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          img3="https://images.unsplash.com/photo-1544588440-fc7551331160?q=80&w=1844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          sectionTitle="About Sevasangam"
          sectionDesc="At SevaSangam, we are more than just a donation platform; we are a community united by a shared reverence for tradition and a desire to make a lasting impact. With a user-friendly interface, secure transactions, and transparent processes, we invite you to join us on this journey of devotion, connection, and empowerment.
Together, let&apos;s uphold the legacy of our cultural heritage, support the sanctity of temples, and nurture the spiritual fabric of society. Welcome to SevaSangam, where every offering is a testament to the power of Seva (service) and the strength of our collective devotion.
"
        />





        <section className="review-container">
          <div className="review top">
            <div className="review-text">
              SevaSangam has truly transformed my spiritual journey. Being able to make donations to my favorite      temples with just a few clicks has made it so much more convenient for me. I feel connected to my faith in a whole new way, thanks to SevaSangam!
            </div>
            <div className="review-author">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anonymous</span>
                <span className="text-sm">Devotee</span>
              </div>
            </div>
          </div>
          <div className="review-heading top">
            <h2 className="section-heading">
              Here&rsquo;s what people say about us
            </h2>
          </div>
          <div className="review top">
            <div className="review-text">
              As a temple administrator, I can't thank SevaSangam enough for the support they provide. Their platform has helped us streamline our donation process and increase transparency. With SevaSangam, we can focus more on serving our community and less on administrative tasks."

            </div>
            <div className="review-author">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anonymous </span>
                <span className="text-sm">Temple Administrator</span>
              </div>
            </div>
          </div>
          <div className="review bottom">
            <div className="review-text">
              Our family has been using SevaSangam for a while now, and we're impressed by how easy it is to use. It's not just about making donations; it's about feeling connected to our culture and traditions. SevaSangam has made it possible for us to pass on these values to our children.
            </div>
            <div className="review-author">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"

                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anonymous</span>
                <span className="text-sm">Family</span>
              </div>
            </div>
          </div>
          <div className="review bottom">
            <div className="review-text">
              SevaSangam has become an integral part of our community's efforts to support our local temples. The platform's user-friendly interface and transparent transactions have instilled trust among our members. With SevaSangam, we're able to come together and make a meaningful impact on our religious institutions.
            </div>
            <div className="review-author">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"

                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anonymous</span>
                <span className="text-sm">Community Leader</span>
              </div>
            </div>
          </div>
          <div className="review bottom">
            <div className="review-text">
              SevaSangam has been a blessing in my life. As a devotee living far away from my hometown, I often felt disconnected from my roots and my beloved temple. However, ever since I discovered SevaSangam, that sense of distance has diminished.
            </div>
            <div className="review-author">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"

                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anonymous</span>
                <span className="text-sm">Devotee</span>
              </div>
            </div>
          </div>
          <div className="review bottom">
            <div className="review-text">
              SevaSangam has made it possible for me to uphold my traditions and express my devotion in a meaningful way, regardless of where I am physically. For that, I am deeply grateful.
            </div>
            <div className="review-author">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"

                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anonymous</span>
                <span className="text-sm">Devotee</span>
              </div>
            </div>
          </div>
        </section>
      </Layout >
    </>
  );
}

export default Home;
