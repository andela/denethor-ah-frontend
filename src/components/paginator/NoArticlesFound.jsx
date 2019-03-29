import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

library.add(faTimesCircle);

const NoArticlesFound = () => (
  <div className='flex search-error'>
    <FontAwesomeIcon
      icon={faTimesCircle}
      size='3x'
      color='#ff0000'
    />
    &nbsp;&nbsp;&nbsp;
    <h2>No Article was found in this category</h2>
  </div>
);

export default NoArticlesFound;
