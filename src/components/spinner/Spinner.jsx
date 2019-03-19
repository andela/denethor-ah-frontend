import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Spinner = ({ loading }) => (
  <div className="spinner-container">
    {
      loading
        ? <div className="spinner-content" />
        : ''
    }
  </div>
);

Spinner.propTypes = {
  loading: PropTypes.bool,
};

export default Spinner;
