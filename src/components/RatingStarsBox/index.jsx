/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './style.scss';

// This component shows the rating stars that
// can be clicked to make actions
const RatingStarsBox = (starClickHandle) => {

  const getStars = () => {
    let starNumbers = [1, 2, 3, 4, 5];

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

export default RatingStarsBox;