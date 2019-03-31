import React from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';

import { HorizontalLine } from '../horizontalLine';
import './styles.scss';

const HighlightEntries = ({ highlights = [] }) => (
  <div>
    {highlights.length > 0 && <div><HorizontalLine />Highlighted Comments</div>}
    {
      highlights.map(({ comment, highlight }) => {
        return (
          <div key={uuid()} className='highlight-entry'>
            <div className='highlight-text'>
              <p>{highlight}</p>
            </div>
            <div className='highlight-comment'>
              <p>{comment}</p>
            </div>
          </div>
        );
      })
    }
  </div>
);

HighlightEntries.propTypes = {
  highlights: PropTypes.array
}

export default HighlightEntries;
