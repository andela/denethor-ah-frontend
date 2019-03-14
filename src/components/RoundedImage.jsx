import React from 'react';
import PropTypes from 'prop-types';


const RoundedImage = ({ imageSource, alt }) => {
  return (
    <div className='rounded-image'>
      <img src={imageSource} alt={alt} />
    </div>
  );
}

RoundedImage.propTypes = {
  imageSource: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default RoundedImage;