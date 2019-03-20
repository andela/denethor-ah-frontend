/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

// This component shows the rating stars that
// can be clicked to make actions
const RatingStarsBox = ({starClickHandle}) => {
  const getStars = () => {
    let starNumbers = [5, 4, 3, 2, 1];
    const stars = starNumbers.map(item => {
      return (
        <span key={item} onClick={() => starClickHandle(item)}>☆</span>
      )
    });
    return stars;
  }

  return (
    <span className="rating-stars">
      {getStars()}
    </span>
  )
}

RatingStarsBox.propTypes = {
  starClickHandle: PropTypes.func
}

export default RatingStarsBox;