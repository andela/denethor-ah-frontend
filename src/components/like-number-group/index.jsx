import React from 'react';
import { InactiveLikeButton, DislikeButton, BookMarkHeartIcon } from '../impression-icons';
import PropTypes from 'prop-types';
import './style.scss';

const LikeNumberGroup = ({ likeCount, onClick }) => {
  return (
    <span className='likes-number-group'>
      <InactiveLikeButton  onClick={onClick}/> <span className='like-count'>{likeCount}</span>
    </span>
  )
}

const DisLikeNumberGroup = ({ dislikeCount, onClick }) => {
  return (
    <span className='likes-number-group'>
      <DislikeButton onClick={onClick}/> <span className='like-count'>{dislikeCount}</span>
    </span>
  )
}

const BookMarkNumberGroup = ({ bookMarkCount, onClick}) => {
  return (
    <span className='likes-number-group'>
      <BookMarkHeartIcon onClick={onClick}/> <span className='like-count'>{bookMarkCount}</span>
    </span>
  )
}

LikeNumberGroup.propTypes = {
  likeCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

DisLikeNumberGroup.propTypes = {
  dislikeCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

BookMarkNumberGroup.propTypes = {
  bookMarkCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export  { LikeNumberGroup, DisLikeNumberGroup , BookMarkNumberGroup };