import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

library.add(faStar);

// This component shows rating results
const RatingStars = ({ rateNumber }) => {
  let coloredStarsCount = rateNumber;
  let uncoloredStarsCount = 5 - coloredStarsCount;
  let coloredStars = addStars(coloredStarsCount, 'checked');
  let uncoloredStars = addStars(uncoloredStarsCount, 'unchecked');

  return <span>
    {coloredStars}
    {uncoloredStars}
  </span>
}

const addStars = (number, theme) => {
  let stars = [];
  let color = theme === 'checked' ? '#F1D230' : '#ffffff';
  for(let i = 1; i <= number; i++) {
    stars.push(<i key={uuidv4()}><FontAwesomeIcon icon={"star"} color={color} />&nbsp;</i>);
  }
  return stars;
}

RatingStars.propTypes = {
  rateNumber: PropTypes.number,
};


export default RatingStars;