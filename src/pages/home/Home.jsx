import "./home.css";
import Layout from "../../components/layout/Layout";
import SearchBar from "../../components/searchBar/SearchBar";
import SectionImgWithText from "../../components/sectionImgWithTextDesc/SectionImgWithText";
import SectionBgImgWithGradient from "../../components/sectionBgImgWithGradient/SectionBgImgWithGradient";
import Button from "../../components/buttons/Button";
import ListingCard from "../../components/listingCard/ListingCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Carousel from 'react-grid-carousel'
import { useNavigate } from "react-router-dom";

import { devoteeSteps, templeAdminSteps } from "./steps";

function Home() {

  const api = import.meta.env.VITE_API_URL;

  const [showSteps, setShowSteps] = useState("devotee")


  
  const [popularTemples, setPopularTemples] = useState([])
  const [recentlyCreatedTemples, setRecentlyCreatedTemples] = useState([])
  const [searchTemple, setSearchTemple] = useState({})

  const [trendingTemples, setTrendingTemples] = useState([])
  const navigate = useNavigate();



  const [filters, setFilters] = useState({
    templeName: '',
    address: ''
  });

  const fetchPopularTemples = async () => {
    try {
      const response = await axios.post(`${api}/temple/filter-temples`, { sortOption: 'mostPopular', limit: 7 });
      if (response.data.success) {
        setPopularTemples(response.data.data.temples);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching filtered temples:', error);
    }
  };

  const fetchRecentlyCreatedTemples = async () => {
    try {
      const response = await axios.post(`${api}/temple/filter-temples`, { sortOption: 'recentlyAdded', limit: 7 });
      if (response.data.success) {
        setRecentlyCreatedTemples(response.data.data.temples);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching filtered temples:', error);
    }
  };


  const fetchfilteredTemples = async () => {
    try {
      const response = await axios.post(`${api}/temple/filter-temples`, filters);
      if (response.data.success) {
        setSearchTemple(response.data.data.temples);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching filtered temples:', error);
    }
  };

  const handleViewAllPopularTemples = () => {

    window.scrollTo(0, 0);
    navigate('/temples?sortOption=mostPopular')
  }

  const handleViewAllRecentCreatedTemples = () => {

    window.scrollTo(0, 0);
    navigate('/temples?sortOption=recentlyAdded')
  }

  const handleViewAllTrendingTemples = () => {
    window.scrollTo(0, 0);
    navigate('/temples?sortOption=trending')
  }

  const handleSearchSubmitOnHomepage = async (id) => {

    try {
      const res = await axios.get(`${api}/temple/get-temple/${id}`);
      const { data } = res.data;
      console.log(data)
      setSearchTemple(data);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display a toast message
    }


  }

  const fetchTrendingTemples = async () => {

    try {
      const res = await axios.get(`${api}/temple/fetch-trending-temples`, { params: { limit: "7" } });

      if (res.data.success) {
        setTrendingTemples(res.data.data.temples)

      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.error('Error creating temple:', error);
    }


  }

  useEffect(() => {
    fetchPopularTemples();
    fetchRecentlyCreatedTemples();
    fetchfilteredTemples();
    fetchTrendingTemples()
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

        <SectionBgImgWithGradient bgImg="src/assets/images/temple-banner.jpg" heading="Welcome to SevaSangam - Your Gateway to Spiritual Connection." description="Join hands with us in upholding tradition, fostering inclusivity,
        and spreading love and light to all. Make your mark on Temples
        journey today by giving from your heart to ours." />

        <section style={{ marginTop: "-130px" }} id="searchTempleToDonate" className="search-section">
          <h2 className=" text-center m-auto text-primary text-xl fw-bold mb-4">
            Search Temple to Donate..
          </h2>
          <div className="box"></div>
          <div className="search-bar-wrapper">
            <SearchBar inHomepage={true} handleSearchSubmitOnHomepage={handleSearchSubmitOnHomepage} />
          </div>

          <div className="listing-container center">
            {searchTemple.templeName ? (
              <ListingCard
                temple={searchTemple}
              />
            ) : (
              popularTemples.map((temple) => (
                <ListingCard
                  key={temple._id} temple={temple}
                />
              ))
            )}
          </div>
        </section>
        <section className="numbers">
          <h2 className="section-heading line mb-4">Our Numbers</h2>

          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center gap-4">
              <div>
                <div className="text-heading">10,000+</div>
                <p className="text-medium">Volunteers in 2022</p>
                <hr></hr>
              </div>
              <div>
                <div className="text-heading">60,000+</div>
                <p className="text-medium">Volunteers in 2023</p>
                <hr></hr>
              </div>
              <div>
                <div className="text-heading">1,00,000+</div>
                <p className="text-medium">Volunteers 2024</p>
                <hr></hr>
              </div>
              {/* <div>
                <div className="text-heading">99.9% </div>
                <p className="text-medium">Transaction Success Rate</p>
                <hr></hr>
              </div> */}
            </div>

            <div className="d-flex flex-column gap-3">
              {/* <p className="text-md">
                Join hands with us in upholding tradition, fostering inclusivity
              </p> */}
              <h2 className="text-heading">
                How we evolve with time and tradition
              </h2>
              <p className="text-md">
                At SevaSangam, our mission and vision stem from recognizing the evolving needs of our society and the timeless significance of spiritual connection. We saw a unique opportunity to bridge tradition and technology, addressing the challenges devotees face in making donations and payments to temples, especially when physical presence is not feasible. In today’s fast-paced world, the need for convenient and secure methods of supporting religious institutions is crucial. Temples are vital in preserving our cultural and spiritual heritage, yet many struggle with financial stability and connecting with the tech-savvy younger generation. Devotees seek meaningful ways to contribute without geographic or time constraints. Seva Sangam addresses these needs by providing an accessible, convenient, and transparent platform for donations, ensuring that temples receive the support they need for upkeep, activities, and community services. This digital solution also engages younger generations, making it easier for them to stay connected to their heritage. Through Seva Sangam, we harness technology to uphold and enhance spiritual traditions, ensuring the cultural and religious fabric of our society remains strong and vibrant for future generations.
              </p>
              
              <div className="btns d-flex gap-4">
                <Button size="medium" type="primary" text="About Us" />
              </div>
            </div>
          </div>
        </section>
        <section className="linear-bg">
          <div className="section-heading line">How it Works</div>

          <div className="d-flex align-items-center flex-wrap">
            <div className="capsuleContainer">
              <div className="capsule">
                <button onClick={
                  () => setShowSteps("devotee")
                }>Devotees</button>
                <button onClick={
                  ()=> setShowSteps("admin")
                }>Admins</button>
                <div className={

                  showSteps === "devotee" ? "capsuleBack left" : "capsuleBack right"
                }>
                </div>

              </div>
              
              
            </div>
            <div className="mt-4">
              {/* style using bootstrap */}
              <Carousel cols={4} rows={1} gap= "30px" loop>
                {
                  showSteps === "devotee" ? devoteeSteps.map((step, index) => (
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
                  )) : templeAdminSteps.map((step, index) => (
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
            </div>
            {/* Content not provided */}
          </div>
        </section>
        {/* Content not provided */}
        {/* <SectionImgWithText
          title="Our Donators"
          img1="https://plus.unsplash.com/premium_photo-1678693021499-c6c5111bbc74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          img2="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          img3="https://images.unsplash.com/photo-1544588440-fc7551331160?q=80&w=1844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          sectionTitle="Lorem Ipsum has been the industrys standard dummy"
          sectionDesc="Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        /> */}


        {trendingTemples && trendingTemples.length > 0 && (
          <section className="listings">
            <div className="section-heading line">
              Trending Temples
              <span className="text-sm d-block mx-2 fw-light text-grey-light">
                Donate to the trending temples
              </span>
            </div>

            <div className="listing-container row">

              <Carousel cols={4} rows={1} gap={1} loop>
                {trendingTemples.map((temple, index) => (


                  <Carousel.Item key={index}>
                    <ListingCard
                      key={index} temple={temple}
                    />
                  </Carousel.Item>

                ))}

                {trendingTemples.length > 8
                  && (
                    <Carousel.Item >
                      <div className="h-100 d-flex justify-content-center align-items-center flex-column">


                        <button onClick={handleViewAllTrendingTemples} className="btn btn-theme-primary">View All Trending Temples</button>
                      </div>
                    </Carousel.Item>
                  )}


              </Carousel>
            </div>
          </section>
        )

        }

        {popularTemples && popularTemples.length > 0 && (
          <section className="listings">
            <div className="section-heading line">
              Based on Popularity
              <span className="text-sm d-block mx-2 fw-light text-grey-light">
                Donate to the temples based on popularity
              </span>
            </div>

            <div className="listing-container row">

              <Carousel cols={4} rows={1} gap={1} loop>
                {popularTemples.map((temple, index) => (


                  <Carousel.Item key={index}>
                    <ListingCard
                      key={index} temple={temple}
                    />
                  </Carousel.Item>

                ))}

                <Carousel.Item >
                  <div className="h-100 d-flex justify-content-center align-items-center flex-column">


                    <button onClick={handleViewAllPopularTemples} className="btn btn-theme-primary">View All Popular Temples</button>
                  </div>
                </Carousel.Item>

              </Carousel>


            </div>
          </section>
        )}

        {recentlyCreatedTemples && recentlyCreatedTemples.length > 0 && (
          <section className="listings">
            <div className="section-heading line">
              Recently Created
              <span className="text-sm d-block mx-2 fw-light text-grey-light">
                Donate to the recently added temples
              </span>
            </div>

            <div className="listing-container row">
              <Carousel cols={4} rows={1} gap={1} loop>
                {recentlyCreatedTemples.map((temple, index) => (


                  <Carousel.Item key={index}>
                    <ListingCard
                      key={index} temple={temple}
                    />
                  </Carousel.Item>

                ))}

                <Carousel.Item >
                  <div className="h-100 d-flex justify-content-center align-items-center flex-column">


                    <button onClick={handleViewAllRecentCreatedTemples} className="btn btn-theme-primary">View All Recent Created Temples</button>
                  </div>
                </Carousel.Item>

              </Carousel>

            </div>
          </section>

        )}



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
      </Layout>
    </>
  );
}

export default Home;
