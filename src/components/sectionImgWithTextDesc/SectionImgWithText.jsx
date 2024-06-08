import PropTypes from 'prop-types';
import './sectionImgWithText.css';
const SectionImgWithText = ({ title, img1, img2, img3, alt1, alt2, alt3, sectionTitle, sectionDesc }) => {
  return (

    <section className="linear-bg">
      <div className="section-heading line">{title}</div>
      <div className="d-flex align-items-center">
        <div className="styled-img-container">
          <div className="styled-img">
            <img src={img1} alt={alt1}></img>
          </div>
          <div className="styled-img">
            <img src={img2} alt={alt2}></img>
          </div>

          <div className="styled-img">
            <img src={img3} alt={alt3}></img>
          </div>
        </div>
        <div className="d-flex flex-column gap-3 text-container">
          <p className="text-md">
            From Clicks to Blessings, SevaSangam&apos;s Vision of Empowering Believers and Enriching Temples
          </p>
          <h2 className="text-heading">
            {sectionTitle}
          </h2>

          <p className="text-md">
            {sectionDesc}
          </p>
        </div>
      </div>
    </section>

  )
}
SectionImgWithText.propTypes = {
  title: PropTypes.string.isRequired,
  img1: PropTypes.string.isRequired,
  img2: PropTypes.string.isRequired,
  img3: PropTypes.string.isRequired,
  alt1: PropTypes.string,
  alt2: PropTypes.string,
  alt3: PropTypes.string,
  sectionTitle: PropTypes.string.isRequired,
  sectionDesc: PropTypes.string.isRequired
};


export default SectionImgWithText