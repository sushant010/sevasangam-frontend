import { Link } from "react-router-dom";
import img from "./../../assets/images/sevasangam-logo.jpg";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer>
        <div>
          <div className="subscribe-box">
            <p className="text-lg my-2">Subscribe Us for Updates</p>
            <div className="d-flex">
              <input placeholder="Email id"></input>
              <button className="btn primary">Subscribe Now</button>
            </div>
          </div>
          <div className="about-and-social mt-4">
            <div>
              <img src={img}></img>
              <span className=" mx-2 bold">Seva Sangam</span>
            </div>
            <div>
              <p className="text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specium.
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
            <Link to="/">Contact Us</Link>
            <Link to="/">About Us</Link>
            <Link to="/">How it works</Link>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Add a Temple</Link>
            <Link to="/">FAQs</Link>
          </div>
          <div className="links-wrapper ">
            <span className="text-lg">Discover</span>
            <Link to="/">Home</Link>
            <Link to="/">Contact Us</Link>
            <Link to="/">About Us</Link>
            <Link to="/">How it works</Link>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Add a Temple</Link>
            <Link to="/">FAQs</Link>
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
                5th Main Rd, Sector 6, HSR Layout, Bangalore, Karnataka, 560102
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center mb-3">
            <div className="icon-wrapper static">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div className="mx-2">
              
              <p className="text-sm">
              test@gmail.com | test2@gmail.com
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="icon-wrapper static">
            <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="mx-2">
              <p className="text-sm">
                 96325896325 | 9632587412
              </p>
            </div>
          </div>
        </div>
        
      </footer>
    </div>
  );
};

export default Footer;
