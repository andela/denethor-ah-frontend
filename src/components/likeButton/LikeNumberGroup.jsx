import React from 'react';
import InactiveLikeButton from './InactiveLikeButton';
import PropTypes from 'prop-types';
import './style.scss';

const LikeNumberGroup = ({ likeCount }) => {
  return (
    <span className='likes-number-group'>
      <InactiveLikeButton /> <span className='like-count'>{likeCount}</span>
    </span>
  )
}

LikeNumberGroup.propTypes = {
  likeCount: PropTypes.number.isRequired
};

export default LikeNumberGroup;