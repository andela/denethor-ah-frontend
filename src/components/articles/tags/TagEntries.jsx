import React from "react";
import PropTypes from 'prop-types';

import './style.scss';

const TagEntries = ({ tagEntries }) => {
  const tags = tagEntries.map((item, index) => {
    const { tagText } = item

    return (
          <li key={index}>
            <a className="tags__section--tags--postTags">{tagText}</a>
          </li>
    );

  })

  return (
      <div className='tags__section'>
        <ul className="tags__section--tags">
        {tags}
        </ul>
      </div>
  );
}

TagEntries.propTypes = {
  tagEntries: PropTypes.array
}

export default TagEntries;