import React from "react";
import PropTypes from 'prop-types';
import './style.scss';
import LikeNumberGroup from '../../components/LikeNumberGroup';
import HorizontalLine from '../../components/HorizontalLine';


const CommentEntries = ({ comments = [] }) => {
  const entries = comments.map((item, index) => {
    return (
      <div key={index} className='comment-entry'>
        <div className='comment-text'>
          <span>{item.commentBody}</span>
        </div>
        <div className='actions'>
          <div className='likes-count'>
            {item.likesCount && <LikeNumberGroup likeCount={25} />}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      {!!entries.length && <div><HorizontalLine />Reader Comments</div>}
      {entries}
    </div>
  );
}

CommentEntries.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentEntries;