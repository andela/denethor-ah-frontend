import React from 'react';
import PropTypes from 'prop-types';


const VerticalMargin = ({ size, className }) => {
  return (
    <div className={`vertical-margin ${className}`} style={{height: size}}>
    </div>
  );
}

VerticalMargin.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

export default VerticalMargin;