import React from "react";
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './styles.scss';
import { CommentImpressionButton } from "../impressionIcons";
import { HorizontalLine } from "../horizontalLine";


const CommentEntries = ({ comments = [], allCommentsImpressions, handleOnClickLike }) => {
  const commentEntries = comments.map((item, index) => {
    const { user: { firstname, lastname }, id } = item;
    const username = `${firstname} ${lastname}`
    const date = format(
      new Date(item.updatedAt),
      'MMM D YYYY, hh:mm a'
    );

    const impression = allCommentsImpressions.length
      ? allCommentsImpressions.find(commentImpression => commentImpression.commentId === id)
      : {};
    const impressionCount = impression
    ? impression.count
    : 0;
  
    const { liked } = impression || {};

    return (
      <div key={index} className='comment-entry'>
        <div className='comment-text'>
          <p>{item.commentBody}</p>
          <div className='comment-text__info'>
            <p className='comment-text__user-name'>{username}</p>
            <p className='comment-text__date'>{date}</p>
          </div>
        </div>
        <div className='actions'>
          <div className='likes-count'>
            <CommentImpressionButton likeImpression={liked} onClick={() => handleOnClickLike(id)} likeCount={impressionCount} />
          </div>
        </div>
      </div>
    );
  });

  const entriesExist = commentEntries.length ? true : false;

  return (
    <div>
      {entriesExist && <div><HorizontalLine />Comments</div>}
      {commentEntries}
    </div>
  );
}

CommentEntries.propTypes = {
  comments: PropTypes.array,
  allCommentsImpressions: PropTypes.array,
  handleOnClickLike: PropTypes.func,
  likeImpression: PropTypes.bool
};

export default CommentEntries;
