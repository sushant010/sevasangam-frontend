import { Link } from "react-router-dom";
import img from "./../../assets/images/sevasangam-logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
const Footer = () => {
  const [subEmailLoading, setSubEmailLoading] = useState(false)


  const handleSubmit = async (e) => {


    e.preventDefault();
    const email = e.target[0].value;
    if (email === "") return toast.error("Please Enter Email");
    const api = import.meta.env.VITE_API_URL
    setSubEmailLoading(true)
    try {
      await axios.post(`${api}/subscriptionEmail/subscribe`, { email });
      toast.success("Subscribed Successfully");
    } catch (error) {
      console.log(error.response.data.message)
      if (error.response?.data?.message === "Email already subscribed") return toast.error("Email already subscribed")
      toast.error("Something went wrong please try again latter")
    } finally {
      setSubEmailLoading(false)
    }

  }
  return (
    <>
      <div className="footer-wrapper">
        <footer>
          <div>
            <div className="subscribe-box">
              <p className="text-lg my-2">Subscribe Us for Updates</p>
              <form className="d-flex" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email id"></input>
                <button className="btn primary" type="submit">
                  {subEmailLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
            <div className="about-and-social mt-4">
              <div>
                <img src={img}></img>
              </div>
              <div>
                <p className="text-sm">
                  SevaSangam is a visionary platform dedicated to facilitating spiritual connections and supporting temples through seamless digital solutions. Founded with a deep commitment to preserving cultural heritage and fostering devotion, SevaSangam bridges tradition with technology to empower individuals and communities worldwide.
                </p>
              </div>
              <div className="icon-container">
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
            </div>
          </div>
          <div className="d-flex ">
            <div className="links-wrapper">
              <span className="text-lg">Discover</span>
              <Link to="/">Home</Link>
              <Link to="/temples">Temples</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/add-temple">Add Temple</Link>
              {/* <Link to="/">Add a Temple</Link>
            <Link to="/">FAQs</Link> */}
            </div>
            <div className="links-wrapper ">
              <span className="text-lg">Policies</span>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>


            </div>
          </div>
          <div className="d-flex flex-column">
            <span className="text-lg mb-3">Contact Us</span>
            <div className="d-flex align-items-start mb-3">
              <div className="icon-wrapper static">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="mx-2">
                <p className="fw-bold">Office Address</p>
                <p className="text-sm">
                  <a target='_blank' href='https://maps.app.goo.gl/fxp9d26ArG8NbFrS9'>    23A, Shanbough Krinshappa Ln, Upparahalli, Mavalli, Bengaluru, Karnataka 560004</a>
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="icon-wrapper static">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="mx-2">

                <p className="text-sm">

                  <a rel="tel" href="+919521133652">9521133652</a> | <a rel="tel" href="+919602672516">9602672516</a>

                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="icon-wrapper static">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="mx-2">
                <p className="text-sm">

                  <a rel="noopener noreferrer" href="mailto:support@sevasangam.com">support@sevasangam.com</a> | <a rel="noopener noreferrer" href="mailto:contact.sevasangam@gmail.com">contact.sevasangam@gmail.com</a>

                </p>
              </div>
            </div>
          </div>


        </footer>

      </div>
      <div style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", background: "var(--color-theme-accent)", color: "#fff" }} className="p-2 d-flex justify-content-center">
        <p style={{ fontSize: "13.5px", color: "var(--text-color-grey-dark)" }}>Copyright &#169; 2024 SevaSangam, All rights reserved | Designed & Developed by <a className="" style={{ color: "var(--text-color-grey-dark)" }} target="_blank" href="https://therankshell.com/">Rankshell</a></p>
      </div>
    </>
  );
};

export default Footer;
