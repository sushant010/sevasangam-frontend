import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import './listing-card.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ListingCard = ({ temple }) => {
  const {
    templeName,
    images: { bannerImage } = {}
  } = temple;

  const navigate = useNavigate();




  const navigateToTemple = (id) => () => {
    window.scrollTo(0, 0);
    navigate('/temple/' + id)
  }

  return (
    <div className="listing" onClick={navigateToTemple(temple._id)}>
      <div className="listing-img-wrapper">
        <img
          src={bannerImage || "https://images.unsplash.com/photo-1564804955013-e02ad9516982?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="temple image"
        />
      </div>

      <div className="listing-content">
        <h2 className="listing-title fw-bold">{templeName}</h2>
        <p className="listing-description text-grey-light text-sm">
          {temple.location.city ? temple.location.city : 'City'}, {temple.location.state ? temple.location.state : 'State'}, {temple.location.country ? temple.location.country : 'Country'}
        </p>
        {/* {donationInLast30DaysAmount > 0 && <p className="text-grey-light fw-normal text-xs">
          <span className='fw-bold'>₹ {donationInLast30DaysAmount}</span> Donated in last 30 days <Link className='px-2 text-primary' style={{ textDecoration: "underline" }} to="/checkout">Donate Now</Link>
        </p>} */}
        <p className="text-grey-light fw-normal text-xs">
          <span className='fw-bold'>₹ {temple.donationInLast30Days}</span> Donated in last 30 days
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
      country: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string
    }),
    donation: PropTypes.number.isRequired,
    donationInLast30Days: PropTypes.number.isRequired,
    images: PropTypes.shape({
      bannerImage: PropTypes.string
    })
  }).isRequired
};

export default ListingCard;
