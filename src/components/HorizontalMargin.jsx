import React from 'react';
import PropTypes from 'prop-types';

const HorizontalMargin = ({ size, className }) => {
  return (
    <div className={`horizontal-margin ${className}`} style={{marginRight: size}}>
    </div>
  );
}

HorizontalMargin.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

export default HorizontalMargin;