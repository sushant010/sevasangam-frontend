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

const Temple = () => {
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
      templeBannerImage: [],
      templeImages: [],
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
    navigate({
      pathname: "/checkout",
      search: `?${createSearchParams({ currency: currency })}`,
    });
  };

  const fetchTemple = async () => {
    try {
      const res = await axios.get(`${api}/temple/get-temple/${id}`);
      const { data } = res.data;
      console.log("templeeee ")
      console.log(data);
      setTemple(data);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display a toast message
    }
  };

  const fetchSimilarTemples = async () => {
    try {
      const res = await axios.post(
        `${api}/temple/fetch-similar-temples/${id}`,
        { limit: 4 }
      );
      const { data } = res.data;
      setSimilarTemple(data.temples);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display a toast message
    }
  };

  useEffect(() => {
    fetchTemple();
    fetchSimilarTemples();
  }, []);

  return (
    <Layout>
      <section className="temple-container">
        <div className="d-flex align-items-start" style={{ gap: "15px" }}>
          <div>
            <div className="img-wrapper" style={{ height: "400px" }}>
              <img
                src={
                  temple.bannerImage
                    ? temple.bannerImage
                    : "https://images.unsplash.com/photo-1564804955013-e02ad9516982?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="temple"
              />
              <div className="temple-details">
                <div className="d-flex">
                  <span className="feature bg-primary">Tax Benfit</span>
                  <span className="feature bg-success">Assured</span>
                </div>
                <p>Type of Organization : {temple.typeOfOrganization}</p>
                <p>{temple.description}</p>

                <div className="social-media">
                  {temple.socialMedia.facebook && (
                    <div>
                      <a href={temple.socialMedia.facebook}>
                        <img
                          src="https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png"
                          alt="Facebook"
                        />
                      </a>
                    </div>
                  )}

                  {temple.socialMedia.instagram && (
                    <div>
                      <a href={temple.socialMedia.instagram}>
                        <img
                          src="https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_1280.jpg"
                          alt="Instagram"
                        />
                      </a>
                    </div>
                  )}

                  {temple.socialMedia.twitter && (
                    <div>
                      <a href={temple.socialMedia.twitter}>
                        <img
                          src="https://www.shutterstock.com/image-vector/indonesia-31-july-2023-logo-260nw-2340258601.jpg"
                          alt="Twitter"
                        />
                      </a>
                    </div>
                  )}

                  {temple.website && (
                    <div>
                      <a href={temple.website}>
                        <img
                          src="https://static.vecteezy.com/system/resources/thumbnails/003/731/316/small/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg"
                          alt="Website"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2 temple-details">

              <p>Type of Organization : {temple.typeOfOrganization}</p>
              <p>Description : {temple.description}</p>
              <p>Timing : {temple.timing && temple.timing.start} - {temple.timing && temple.timing.end}</p>


              {/* <div className="social-media">
                {temple.socialMedia.facebook && (
                  <div>
                    <a href={temple.socialMedia.facebook}>
                      <img
                        src="https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png"
                        alt="Facebook"
                      />
                    </a>
                  </div>
                )}

                {temple.socialMedia.instagram && (
                  <div>
                    <a href={temple.socialMedia.instagram}>
                      <img
                        src="https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_1280.jpg"
                        alt="Instagram"
                      />
                    </a>
                  </div>
                )}

                {temple.socialMedia.twitter && (
                  <div>
                    <a href={temple.socialMedia.twitter}>
                      <img
                        src="https://www.shutterstock.com/image-vector/indonesia-31-july-2023-logo-260nw-2340258601.jpg"
                        alt="Twitter"
                      />
                    </a>
                  </div>
                )}

                {temple.website && (
                  <div>
                    <a href={temple.website}>
                      <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/003/731/316/small/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg"
                        alt="Website"
                      />
                    </a>
                  </div>
                )}
              </div> */}
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
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                eveniet doloremque facilis placeat sint nam. Dicta, minus sint.
                In officia sunt dignissimos quae totam id odio reiciendis nemo!
                Doloribus, nesciunt. Enim obcaecati optio laborum repellendus
                animi vel nostrum esse cum accusantium, doloribus labore a
                dicta. Excepturi nemo earum pariatur assumenda.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                eveniet doloremque facilis placeat sint nam. Dicta, minus sint.
                In officia sunt dignissimos quae totam id odio reiciendis nemo!
                Doloribus, nesciunt. Enim obcaecati optio laborum repellendus
                animi vel nostrum esse cum accusantium, doloribus labore a
                dicta. Excepturi nemo earum pariatur assumenda.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                eveniet doloremque facilis placeat sint nam. Dicta, minus sint.
                In officia sunt dignissimos quae totam id odio reiciendis nemo!
                Doloribus, nesciunt. Enim obcaecati optio laborum repellendus
                animi vel nostrum esse cum accusantium, doloribus labore a
                dicta. Excepturi nemo earum pariatur assumenda.
              </p>
              <div className="img-wrapper">
                <img
                  src="https://source.unsplash.com/1600x900/?temple-indian"
                  alt="temple"
                />
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                eveniet doloremque facilis placeat sint nam. Dicta, minus sint.
                In officia sunt dignissimos quae totam id odio reiciendis nemo!
                Doloribus, nesciunt. Enim obcaecati optio laborum repellendus
                animi vel nostrum esse cum accusantium, doloribus labore a
                dicta. Excepturi nemo earum pariatur assumenda.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                eveniet doloremque facilis placeat sint nam. Dicta, minus sint.
                In officia sunt dignissimos quae totam id odio reiciendis nemo!
                Doloribus, nesciunt. Enim obcaecati optio laborum repellendus
                animi vel nostrum esse cum accusantium, doloribus labore a
                dicta. Excepturi nemo earum pariatur assumenda.
              </p>
            </div>
          </div>
          <div className="donate-card">
            <h2 style={{ fontSize: "28px" }} className="my-2 section-heading">
              {temple.templeName}
            </h2>
            <p className="mb-2">
              <div className="fa-solid fa-location-dot mx-1"></div>{" "}
              {temple.location.address}
            </p>
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
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                  }}
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
                    <div className="d-flex justify-content-between">
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
                    </div>
                    <hr style={{ margin: "8px 0" }}></hr>
                    <div className="d-flex justify-content-between">
                      <div>Total Donation :</div>
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
                    <div className="payment-options d-flex align-items-center">
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
                    className="my-2 w-100 btn btn-theme-primary"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>



        =
      </section>
      <section className="listings">
        <div className="section-heading line">
          Similar Temples
          <span className="text-sm d-block mx-2 fw-light text-grey-light">
            Donate to other similar temples
          </span>
        </div>

        <div className="listing-container">
          {similarTemple &&
            similarTemple.length > 0 &&
            similarTemple.map((temple, index) => (
              <ListingCard key={index} temple={temple} />
            ))}
        </div>
      </section>
    </Layout>
  );
};

export default Temple;
