import React from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import FeedBottomSmallCard from '../feed/FeedBottomSmallCard';

export const ContentArea = ({ items }) => (
  <div className="paginator__content-area">
    {items.map(item => <FeedBottomSmallCard key={uuid()} {...item} /> )}
  </div>
);

ContentArea.propTypes = {
  items: PropTypes.array
}

export default ContentArea;
