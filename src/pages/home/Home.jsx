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

function Home() {

  const api = import.meta.env.VITE_API_URL;


  const [popularTemples, setPopularTemples] = useState([])
  const [recentlyCreatedTemples, setRecentlyCreatedTemples] = useState([])
  const [searchTemple, setSearchTemple] = useState([])

  const [trendingTemples, setTrendingTemples] = useState([])
  const navigate = useNavigate();



  // const [filters, setFilters] = useState({
  //   templeName: '',
  //   address: ''
  // });

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

      const response = await axios.post(`${api}/temple/filter-temples`, { limit: 3 });
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


  const handleSearchSubmitOnHomepage = async (searchTerm, location) => {

    try {
      const res = await axios.post(`${api}/temple/filter-temples`, {
        templeName: searchTerm,
        address: location
      }, { limit: 3 });
      const { data } = res.data;
      console.log(data)
      setSearchTemple(data.temples);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display a toast message
    }


  }

  // useEffect(() => {
  //   handleSearchSubmitOnHomepage()
  // }, [searchTemple])

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

        <SectionBgImgWithGradient bgImg="src/assets/images/temple-banner.jpg" heading="Welcome to SevaSangam - Your Gateway to Spiritual Connection" description="From Clicks to Blessings, SevaSangam's Vision of Empowering Believers and Enriching Temples." />

        <section style={{ marginTop: "-130px" }} id="searchTempleToDonate" className="search-section">
          <h2 className=" text-center m-auto text-primary text-xl fw-bold mb-4">
            Search Temple to Donate..
          </h2>
          <div className="box"></div>
          <div className="search-bar-wrapper">
            <SearchBar inHomepage={true} handleSearchSubmitOnHomepage={handleSearchSubmitOnHomepage} />
          </div>

          <div className="listing-container center">
            {searchTemple.length > 0 ? (
              searchTemple.map((temple) => (
                <ListingCard
                  key={temple._id} temple={temple}
                />
              ))
            ) : (
              popularTemples.slice(0, 3).map((temple) => (
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
              <h2 className="text-heading text-primary">
                How we evolved
              </h2>
              <p className="text-md">
                At SevaSangam, our mission and vision stem from recognizing the evolving needs of our society and the timeless significance of spiritual connection. We saw a unique opportunity to bridge tradition and technology, addressing the challenges devotees face in making donations and payments to temples, especially when physical presence is not feasible.
              </p>
              <p className="text-md">
                In today’s fast-paced world, the need for convenient and secure methods of supporting religious institutions is crucial. Temples are vital in preserving our cultural and spiritual heritage, yet many struggle with financial stability and connecting with the tech-savvy younger generation. Devotees seek meaningful ways to contribute without geographic or time constraints. Seva Sangam addresses these needs by providing an accessible, convenient, and transparent platform for donations, ensuring that temples receive the support they need for upkeep, activities, and community services. This digital solution also engages younger generations, making it easier for them to stay connected to their heritage. Through Seva Sangam, we harness technology to uphold and enhance spiritual traditions, ensuring the cultural and religious fabric of our society remains strong and vibrant for future generations.
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
            <div className="w-100">
              <div className="tab-btns-container d-flex justify-content-center m-auto mt-4">
                <div
                  className="tab-btns btn primary"
                  style={{
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    flex: "1",
                  }}
                >
                  For Donors
                </div>
                <div
                  className=" tab-btns btn primary"
                  style={{
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    borderColor: "white",
                    flex: "1",
                  }}
                >
                  For Temple Owners
                </div>
              </div>
            </div>
            <div className="card-container">
              <div className="card">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Card Image"
                  className="card-image"
                />
                <div className="card-content">
                  <h2 className="card-title">Fill the Form</h2>
                  <p className="card-description">
                    Lorem Ipsum has been the industrys standard dummy{" "}
                  </p>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Card Image"
                  className="card-image"
                />
                <div className="card-content">
                  <h2 className="card-title">Fill the Form</h2>
                  <p className="card-description">
                    Lorem Ipsum has been the industrys standard dummy{" "}
                  </p>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Card Image"
                  className="card-image"
                />
                <div className="card-content">
                  <h2 className="card-title">Fill the Form</h2>
                  <p className="card-description">
                    Lorem Ipsum has been the industrys standard dummy{" "}
                  </p>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Card Image"
                  className="card-image"
                />
                <div className="card-content">
                  <h2 className="card-title">Fill the Form</h2>
                  <p className="card-description">
                    Lorem Ipsum has been the industrys standard dummy{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
          <div className="review">
            <div className="review-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              quia, error repudiandae fuga nisi quo doloribus hic dolore dolores
              corporis, fugiat soluta voluptate expedita sunt! Incidunt nisi ut
              error perspiciatis!
            </div>
            <div className="review-author">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anjali Singh</span>
                <span className="text-sm">Fullstack Developer</span>
              </div>
            </div>
          </div>
          <div className="review-heading">
            <h2 className="section-heading">
              Here&rsquo;s what people say about us
            </h2>
          </div>
          <div className="review">
            <div className="review-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              quia, error repudiandae fuga nisi quo doloribus hic dolore dolores
              corporis, fugiat soluta voluptate expedita sunt! Incidunt nisi ut
              error perspiciatis!
            </div>
            <div className="review-author">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anjali Singh</span>
                <span className="text-sm">Fullstack Developer</span>
              </div>
            </div>
          </div>
          <div className="review">
            <div className="review-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              quia, error repudiandae fuga nisi quo doloribus hic dolore dolores
              corporis, fugiat solutasum dolor sit amet consectetur adipisicing
              elit. Ipsa quia, error repudiandae fuga nisi quo doloribus hic
              dolore dolores corporis, fugiat sol voluptate expedita sunt!
              Incidunt nisi ut error perspiciatis!
            </div>
            <div className="review-author">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anjali Singh</span>
                <span className="text-sm">Fullstack Developer</span>
              </div>
            </div>
          </div>
          <div className="review">
            <div className="review-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              quia, error repudiandae fuga nisi quo doloribus hic dolore dolores
              corporis, fugiat solutasum dolor sit amet consectetur adipisicing
              elit. Ipsa quia, error repudiandae fuga nisi quo doloribus hic
              dolore dolores corporis, fugiat sol voluptate expedita sunt!
              Incidunt nisi ut error perspiciatis!
            </div>
            <div className="review-author">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anjali Singh</span>
                <span className="text-sm">Fullstack Developer</span>
              </div>
            </div>
          </div>
          <div className="review">
            <div className="review-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              quia, error repudiandae fuga nisi quo doloribus hic dolore dolores
              corporis, fugiat solutasum dolor sit amet consectetur adipisicing
              elit. Ipsa quia, error repudiandae fuga nisi quo doloribus hic
              dolore dolores corporis, fugiat sol voluptate expedita sunt!
              Incidunt nisi ut error perspiciatis!
            </div>
            <div className="review-author">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anjali Singh</span>
                <span className="text-sm">Fullstack Developer</span>
              </div>
            </div>
          </div>
          <div className="review">
            <div className="review-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              quia, error repudiandae fuga nisi quo doloribus hic dolore dolores
              corporis, fugiat solutasum dolor sit amet consectetur adipisicing
              elit. Ipsa quia, error repudiandae fuga nisi quo doloribus hic
              dolore dolores corporis, fugiat sol voluptate expedita sunt!
              Incidunt nisi ut error perspiciatis!
            </div>
            <div className="review-author">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <div className="d-flex">
                <span className="text-sm">Anjali Singh</span>
                <span className="text-sm">Fullstack Developer</span>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Home;
