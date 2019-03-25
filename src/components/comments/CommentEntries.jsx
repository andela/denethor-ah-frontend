import React from "react";
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './styles.scss';
import { LikeNumberGroup } from '../../components/likeNumberGroup';
import { HorizontalLine } from '../../components/horizontalLine';


const CommentEntries = ({ comments = [] }) => {
  const entries = comments.map((item, index) => {
    const { user: { firstname, lastname } } = item;
    const username = `${firstname} ${lastname}`
    const date = format(
      new Date(item.updatedAt),
      'MMM D YYYY, hh:mm a'
    );

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
            {item.likesCount && <LikeNumberGroup likeCount={25} />}
          </div>
        </div>
      </div>
    );
  });

  const entriesExist = entries.length ? true : false;

  return (
    <div>
      {entriesExist && <div><HorizontalLine />Comments</div>}
      {entries}
    </div>
  );
}

CommentEntries.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentEntries;
