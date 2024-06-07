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

function Home() {

  const api = import.meta.env.VITE_API_URL;


  const [popularTemples, setPopularTemples] = useState([])
  const [recentlyCreatedTemples, setRecentlyCreatedTemples] = useState([])
  const [searchTemple, setSearchTemple] = useState({})

  const [trendingTemples, setTrendingTemples] = useState([])



  const [filters, setFilters] = useState({
    templeName: '',
    address: ''
  });

  const fetchPopularTemples = async () => {
    try {
      const response = await axios.post(`${api}/temple/filter-temples`, { sortOption: 'mostPopular', limit: 4 });
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
      const response = await axios.post(`${api}/temple/filter-temples`, { sortOption: 'recentlyAdded', limit: 4 });
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
      const res = await axios.get(`${api}/temple/fetch-trending-temples`, { params: { limit: "4" } });

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
                <div className="text-heading">16,453</div>
                <p className="text-medium">Volunteers in 2022</p>
                <hr></hr>
              </div>
              <div>
                <div className="text-heading">56,236</div>
                <p className="text-medium">Volunteers in 2023</p>
                <hr></hr>
              </div>
              <div>
                <div className="text-heading">1,26,538</div>
                <p className="text-medium">Volunteers in 2024</p>
                <hr></hr>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              {/* <p className="text-md">
                Join hands with us in upholding tradition, fostering inclusivity
              </p> */}
              <h2 className="text-heading">
                Lorem Ipsum has been the industrys standard dummy
              </h2>
              <p className="text-md">
                Lorem Ipsum has been the industry s standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <p className="text-md">
                Lorem Ipsum has been the industry s standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
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
          sectionTitle="Lorem Ipsum has been the industrys standard dummy"
          sectionDesc="Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />


        {trendingTemples && trendingTemples.length > 0 && (
          <section className="listings">
            <div className="section-heading line">
              Trending Temples
              <span className="text-sm d-block mx-2 fw-light text-grey-light">
                Donate to the trending temples
              </span>
            </div>

            <div className="listing-container">
              {trendingTemples.map((temple, index) => (
                <ListingCard
                  key={index} temple={temple}
                />

              ))}
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

            <div className="listing-container">
              {popularTemples.map((temple, index) => (
                <ListingCard
                  key={index} temple={temple}
                />

              ))}


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

            <div className="listing-container">
              {recentlyCreatedTemples && recentlyCreatedTemples.map((temple, index) => (
                <ListingCard
                  key={index} temple={temple}
                />

              ))}
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
