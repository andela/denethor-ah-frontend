/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const RatingStarsBox = ({starClickHandle, ratingNumber}) => {
  const getStars = () => {
    let starNumbers = [5, 4, 3, 2, 1];
    const stars = starNumbers.map(item => {
      const status = item === ratingNumber ? "selected" : ""
      return (
        <span key={item} onClick={() => starClickHandle(item)} className={status}>☆</span>
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
  starClickHandle: PropTypes.func,
  ratingNumber: PropTypes.number,
}

export default RatingStarsBox;