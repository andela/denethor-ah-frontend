import React from 'react';
import { InactiveLikeButton, DislikeButton, BookMarkHeartIcon, CommentButton } from '../impressionIcons';
import PropTypes from 'prop-types';
import './style.scss';
 
const LikeNumberGroup = ({ btnColor, onClick, likeCount }) => {
  return (
    <span className='likes-number-group'>
      <InactiveLikeButton btnColor={btnColor} onClick={onClick}/>&nbsp;
        <span className='like-count'>{likeCount}</span>
    </span>
  )
}

const DisLikeNumberGroup = ({ btnColor, onClick, dislikeCount }) => {
  return (
    <span className='likes-number-group '>
      <DislikeButton onClick={onClick} btnColor={btnColor}/>&nbsp;
        <span className='like-count dislike-count'>{dislikeCount}</span>
    </span>
  )
}

const BookMarkNumberGroup = ({btnColor,  onClick}) => {
  return (
    <span className='likes-number-group'>
      <BookMarkHeartIcon onClick={onClick} btnColor={btnColor}/> 
      <span className='like-count'> </span>
    </span>
  )
}

const CommentButtonGroup = ({commentsCount}) => {
  return (
    <span className='likes-number-group'>
      <CommentButton /> <span className='like-count'>{commentsCount}</span>
    </span>
  )
}

LikeNumberGroup.propTypes = {
  btnColor: PropTypes.bool,
  likeCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

DisLikeNumberGroup.propTypes = {
  dislikeCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  btnColor: PropTypes.bool,
}

BookMarkNumberGroup.propTypes = {
  btnColor: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

CommentButtonGroup.propTypes = {
  commentsCount: PropTypes.number
}

export  { LikeNumberGroup, DisLikeNumberGroup , BookMarkNumberGroup, CommentButtonGroup };