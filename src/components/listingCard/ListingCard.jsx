import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ temple }) => {
  const {
    templeName,
    location: { address = '', country = '' } = {},
    donation,
    images: { logo } = {}
  } = temple;

  const navigate = useNavigate();

  const navigateToTemple = (id) => () => {
    navigate('/temple/' + id)
  }

  return (
    <div className="listing" onClick={navigateToTemple(temple._id)}>
      <div className="listing-img-wrapper">
        <img
          src={logo || "https://images.unsplash.com/photo-1564804955013-e02ad9516982?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="temple image"
        />
      </div>

      <div className="listing-content">
        <h2 className="listing-title fw-bold">{templeName}</h2>
        <p className="listing-description text-grey-light text-sm">
          {`${address}, ${country}`}
        </p>
        <p className="text-grey-light fw-normal text-xs">
          ₹ {donation} Donated in last 30 days
        </p>
      </div>
    </div>
  );
}

ListingCard.propTypes = {
  temple: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    templeName: PropTypes.string.isRequired,
    location: PropTypes.shape({
      address: PropTypes.string,
      country: PropTypes.string
    }),
    donation: PropTypes.number.isRequired,
    images: PropTypes.shape({
      logo: PropTypes.string
    })
  }).isRequired
};

export default ListingCard;
