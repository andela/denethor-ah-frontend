import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ContentArea = ({ children }) => {
  return (
    <div className='page-content-area'>
      {children}
    </div>
  );
}

ContentArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ContentArea;