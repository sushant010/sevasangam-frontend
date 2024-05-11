import PropTypes from 'prop-types';
import './sectionBgImgWithGradient.css';
import { Link } from 'react-router-dom';

const SectionBgImgWithGradient = ({bgImg,heading,description,btn1Link,btn1Text, btn2Link,btn2Text,btn1Class,btn2Class}) => {
  
  return (
 
    <section className="hero-section" style={{backgroundImage: `url('${bgImg}')`}}>
    <div className="hero-section-text">
      <h2 className="text-heading">
        {heading}
      </h2>
      <p className="text-lg">
        {description}
      </p>
      <div className="btns d-flex gap-4">
  
          <Link to={btn1Link} className={`btn ${btn1Class}`}>{btn1Text}</Link>
          <Link to={btn2Link} className={`btn ${btn2Class}`}>{ btn2Text}</Link>
      </div>
    </div>
  </section>

  )
}
SectionBgImgWithGradient.propTypes = {
  bgImg: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  btn1Link: PropTypes.string,
  btn2Link: PropTypes.string,
  btn1Text: PropTypes.string,
  btn2Text: PropTypes.string,
  btn1Class: PropTypes.string,
  btn2Class: PropTypes.string,

};
SectionBgImgWithGradient.defaultProps = {
  btn1Link: "/",
  btn2Link: "/contact-us",
  btn1Text: "Donate Now",
  btn2Text: "Contact Us",
  btn1Class: "btn-theme-primary",
  btn2Class: "btn-theme-grey",

};


export default SectionBgImgWithGradient