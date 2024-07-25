import {
  createSearchParams,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import Layout from "../../components/layout/Layout";
import "./temple.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import defaultLogo from '../../assets/images/sevasangam-logo.png';
import { useDonate } from "../../context/Donate";
import currencyCodes from "currency-codes";
import getSymbolFromCurrency from "currency-symbol-map";
import ListingCard from "../../components/listingCard/ListingCard";
import Carousel from "react-grid-carousel";
import EventCard from "../../components/eventCard/EventCard";
import defaultLogo from '../../assets/images/sevasangam-logo.png';
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";




const Temple = () => {




  const [loading, setLoading] = useState(false);
  //console all the currency code with symbols


  const initialState = {
    templeName: "",
    typeOfOrganization: "",
    description: "",
    createdBy: "",
    contactPerson: {
      name: "",
      email: "",
      mobile: "",
    },
    location: {
      address: "",
      country: "",
    },
    images: {
      logo: "",
      bannerImage: [],
      otherImages: [],
    },
    bankDetails: {
      bankName: "",
      branch: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      routingNumber: "",
      swiftBicCode: "",
    },
    taxInformation: {
      taxId: "",
      ein: "",
    },
    website: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
    upcomingEvents: [],
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [donate, setDonate] = useDonate();
  const api = import.meta.env.VITE_API_URL;
  const [temple, setTemple] = useState(initialState);
  const [currency, setCurrency] = useState("INR");
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [tip, setTip] = useState(0);
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const [similarTemple, setSimilarTemple] = useState([]);

  const currencySelectChange = (e) => {
    setCurrency(e.target.value);
  };



  useEffect(() => {
    const currencySymbol = getSymbolFromCurrency(currency);
    setCurrencySymbol(currencySymbol);
  }, [currency]);

  const [amount, setAmount] = useState(3000);

  const updateAmount = (e) => {
    setAmount(parseInt(e.target.innerText.replace(/[^\d]/g, "")));
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDonation = (e) => {
    setDonate({ ...donate, amount: amount, templeId: temple._id });
    localStorage.setItem(
      "donate",
      JSON.stringify({ amount: amount, templeId: temple._id })
    );
    window.scrollTo(0, 0);
    navigate({
      pathname: "/checkout",
      search: `?${createSearchParams({ currency: currency })}`,
    });
  };

  const fetchTemple = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/temple/get-temple/${id}`);
      const { data } = res.data;

      setTemple(data);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display a toast message
    } finally {
      setLoading(false);
    }
  };

  const fetchEventsOfTemple = async () => {
    try {
      const res = await axios.post(`${api}/temple/event/get-all-events-by-temple/${id}`);
      const { data } = res.data;
      setEvents(data.filter(event => new Date(event.date.end) >= new Date()));
      setPastEvents(data.filter(event => new Date(event.date.end) < new Date()));
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display a toast message
    }
  };

  const fetchSimilarTemples = async () => {
    try {
      const res = await axios.post(
        `${api}/temple/fetch-similar-temples/${id}`,
        { limit: 7 }
      );
      const { data } = res.data;
      setSimilarTemple(data.temples);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display a toast message
    }
  };




  const handleViewAllSimilarTemples = () => {
    window.scrollTo(0, 0);
    navigate('/temples?sortOption=trending')
  }



  useEffect(() => {
    fetchTemple();
    fetchSimilarTemples();
    fetchEventsOfTemple()
  }, [id]);

  return (
    <Layout title={`${templeName} | Sevasangam`} description={`Donate to ${templeName} located in ${location.address}`}>
      <section className="temple-container">
        <div className="d-flex align-items-start" style={{ gap: "15px" }}>
          <div style={{}}>
            <div style={{ height: "400px", position: "relative" }}>

              <img
                src={temple.images?.bannerImage || defaultLogo}
                alt="temple"
                style={{ height: "100%", width: "100%", objectFit: "cover" }} />
              <img
                src={temple.images?.logo}
                alt="temple"
                style={{ borderRadius: "4px", height: "auto", width: "120px", objectFit: "contain", position: "absolute", top: "10px", right: "10px" }} />
            </div>
            <div className="mt-2 temple-details">

              <p>Type of Organization : {temple.typeOfOrganization}</p>
              <p>Description : {temple.description}</p>
              <p>Timing : {temple.timing && temple.timing.start} - {temple.timing && temple.timing.end}</p>



              <div style={{ gap: "20px", justifyContent: "start" }} className="icon-container">
                <div className="icon-wrapper">
                  <i className="fa-brands fa-facebook-f"></i>
                </div>
                <div className="icon-wrapper">
                  <i className="fa-brands fa-instagram"></i>
                </div>

                <div className="icon-wrapper">
                  <i className="fa-brands fa-x-twitter"></i>
                </div>

                <div className="icon-wrapper">
                  <i className="fa-brands fa-linkedin-in"></i>
                </div>
                <div className="icon-wrapper">
                  <i className="fa-brands fa-facebook-f"></i>
                </div>
              </div>
              <hr></hr>
            </div>

            <div className="temple-details">
              <h3 className="section-heading ">
                About {temple.templeName}
              </h3>


              <div className="about-container row">
                {temple?.images?.otherImages && temple.images.otherImages.slice(0, 2).map((image, index) => (
                  <>
                    <div key={index} style={{ gap: "10px" }} className="col-md-12 mb-3 d-flex flex-wrap">
                      <div className={`img-wrapper order-${index}`}>
                        <img
                          src={image}
                          alt="temple"
                        />
                      </div>

                      <div style={{ flex: "1" }}>
                        {temple[`aboutTemple${index + 1}`]}
                      </div>

                    </div>
                    <hr></hr>
                  </>
                ))}

              </div>
              <div className="section-heading" style={{ fontSize: "24px" }}>All Images</div>
              <div className="all-images-container">

                {temple?.images?.bannerImage && (
                  <>
                    <div className={`img-wrapper `}>
                      <img
                        src={temple?.images?.bannerImage}
                        alt="temple"
                      />
                    </div>

                  </>
                )}
                {temple?.images?.logo && (
                  <>
                    <div className={`img-wrapper `}>
                      <img
                        style={{ objectFit: "contain" }}
                        src={temple?.images?.logo}
                        alt="temple"
                      />
                    </div>

                  </>
                )}
                {temple?.images?.otherImages && temple.images.otherImages.map((image, index) => (
                  <>
                    <div key={index} className={`img-wrapper order-${index}`}>
                      <img
                        src={image}
                        alt="temple"
                      />
                    </div>

                  </>
                ))}
                {/* <Map address={temple?.location?.address} /> */}

              </div>





              {events.length > 0 ? (
                <div className="row">
                  <div className="col-md-12">
                    <div style={{ fontSize: "34px" }} className="section-heading line my-3">Upcoming Events</div>
                  </div>
                  <Carousel cols={3} rows={1} gap={20} loop>
                    {events && events.map((event, index) => (


                      <Carousel.Item key={index}>
                        <EventCard event={event} />
                      </Carousel.Item>

                    ))}

                    {/* {similarTemple.length > 8
                      && (
                        <Carousel.Item >
                          <div className="h-100 d-flex justify-content-center align-items-center flex-column">


                            <button onClick={handleViewAllSimilarTemples} className="btn btn-theme-primary">View All Similar Temples</button>
                          </div>
                        </Carousel.Item>
                      )} */}


                  </Carousel>

                </div>
              ) : null}

              {
                pastEvents.length > 0 && (
                  <div className="row">
                    <div className="col-md-12">
                      <div style={{ fontSize: "34px" }} className="section-heading line my-3">Past Events</div>
                    </div>
                    <Carousel cols={3} rows={1} gap={20} loop>
                      {pastEvents && pastEvents.map((event, index) => (
                        <Carousel.Item key={index}>
                          <EventCard event={event} />
                        </Carousel.Item>
                      ))}

                    </Carousel>
                  </div>
                )
              }


            </div>
          </div>
          <div className="donate-card">
            <h2 style={{ fontSize: "28px" }} className="my-2 section-heading">
              {temple.templeName}
            </h2>
            <div className="mb-2">
              <div className="fa-solid fa-location-dot mx-1"></div>{" "}
              {temple.location.address}
            </div>
            <div className=" mb-2 d-flex">
              <span className="feature bg-primary">Tax Benefit</span>
              <span className="feature bg-success">Assured</span>
            </div>

            <div className="donation-ways row">
              <div className="col-md-12">
                <div className="section-heading-wrapper">
                  <h3 style={{ fontSize: "18px" }} className="section-heading">
                    Choose Amount
                  </h3>
                  {/* Currency select */}
                </div>
                <div
                  className="temple-donation"
                // style={{
                //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                // }}
                >
                  <div
                    style={{ gap: "10px" }}
                    className="mt-2 my-4 d-flex flex-wrap align-items-center"
                  >
                    <span onClick={updateAmount} className="amount">
                      + {currencySymbol}1000
                    </span>

                    <span onClick={updateAmount} className="amount">
                      + {currencySymbol}2000
                    </span>

                    <span onClick={updateAmount} className="amount">
                      + {currencySymbol}3000
                    </span>
                    <input
                      name="amount"
                      onChange={handleAmountChange}
                      value={amount}
                      style={{
                        fontSize: "15px",
                        padding: "4px",
                        flex: "1",
                        height: "45px",
                      }}
                      placeholder="Amount"
                      className="form-control"
                    />
                    <div className="currency-select">
                      <select
                        className="form-select"
                        defaultValue={"INR"}
                        onChange={currencySelectChange}
                      >
                        {currencyCodes.codes().map((code) => {
                          return (
                            <option key={code} value={code}>
                              {code}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="mb-2">
                    {/* <div className="d-flex justify-content-between">
                      <div>Donation :</div>
                      <div style={{ fontWeight: "500" }}>
                        {currencySymbol} {Math.round(amount * 0.84)}
                      </div>
                    </div>
                    <div className="mt-2 d-flex justify-content-between">
                      <div>Tip :</div>
                      <div style={{ fontWeight: "500" }}>
                        {currencySymbol} {Math.round(amount * 0.16)}
                      </div>
                    </div> */}
                    <hr style={{ margin: "8px 0" }}></hr>
                    <div className="d-flex justify-content-between">
                      <div>Donation :</div>
                      <div style={{ fontWeight: "500" }}>
                        {currencySymbol} {Math.round(amount)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3
                      style={{ fontSize: "14px", color: "darkgrey" }}
                      className="section-heading"
                    >
                      Donate Via
                    </h3>
                    <div className="payment-options d-flex align-items-center" style={{ cursor: "pointer" }} onClick={handleDonation}>
                      <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV3CdqG89NHRkD8A7h5evGqC9BkhvPfI3ss2dqK-998A&s"></img>
                      </div>

                      <div>
                        <img src="https://www.india.com/wp-content/uploads/2023/07/PhonePe-Launches-New-Income-Tax-Payment-Feature-Where-How-To-Use.png"></img>
                      </div>

                      <div>
                        <img src="https://i0.wp.com/thedigitalfifth.com/wp-content/uploads/2019/10/Banner15.png?resize=1170%2C480&ssl=1"></img>
                      </div>

                      <div>
                        <img src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/04/google-pay-1680875397.jpg"></img>
                      </div>

                      <div>
                        <img src="https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg"></img>
                      </div>

                      <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbyuLA8AmwE4tYjRyo1piioe-HidlRJICH_Noz7DM2fQ&s"></img>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleDonation}
                    className="donate-btn my-2 w-100 btn btn-theme-primary"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>
      <section className="listings">
        <div className="section-heading line">
          Similar Temples
          <span className="text-sm d-block mx-2 fw-light text-grey-light">
            Donate to other similar temples
          </span>
        </div>

        <div className="listing-container row">
          {/* eslint-disable-next-line */}
          <Carousel cols={4} rows={1} gap={1} loop hideArrow={similarTemple?.length > 4 ? false : true}>
            {similarTemple && similarTemple.map((temple, index) => (


              <Carousel.Item key={index}>
                <ListingCard
                  key={index} temple={temple}
                />
              </Carousel.Item>

            ))}

            {similarTemple.length > 8
              && (
                <Carousel.Item >
                  <div className="h-100 d-flex justify-content-center align-items-center flex-column">


                    <button onClick={handleViewAllSimilarTemples} className="btn btn-theme-primary">View All Similar Temples</button>
                  </div>
                </Carousel.Item>
              )}


          </Carousel>


        </div>
      </section>
      {loading && <LoadingSpinner />}
    </Layout >
  );
};

export default Temple;
