import PropTypes from 'prop-types';
const ListingCard = ({ img, alt, title, location, donation }) => {
  return (
    <div className="listing">
    <div className="listing-img-wrapper">
      <img
        src={img}
        alt={alt}
      />
    </div>

    <div className="listing-content">
              <h2 className="listing-title fw-bold ">{title}</h2>
      <p className="listing-description text-grey-light text-sm">
       {location}
      </p>
      <p className="text-grey-light fw-normal   text-xs">
       {donation}
      </p>
    </div>
  </div>
  )
}

ListingCard.defaultProps = {
    img: "https://images.unsplash.com/photo-1564804955013-e02ad9516982?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "temple image"
};

ListingCard.propTypes = {
    img: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    donation: PropTypes.string.isRequired
};


export default ListingCard