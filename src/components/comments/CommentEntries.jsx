import React from "react";
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import './styles.scss';
import { HorizontalLine } from '../horizontalLine';
import CommentEntry from './CommentEntry';


const CommentEntries = ({ comments = [], handleOnClickLike, allCommentsImpressions  }) => {
  
  const commentEntries = comments.map(comment => <CommentEntry
    handleOnClickLike={handleOnClickLike} 
    allCommentsImpressions={allCommentsImpressions} 
    comment={comment} key={uuid()} />);
  
  return (
    <div>
      {commentEntries[0] && comments[0].user && <div><HorizontalLine />Comments</div>}
      {commentEntries}
    </div>
  );
}
CommentEntries.propTypes = {
  comments: PropTypes.array,
  allCommentsImpressions: PropTypes.array,
  handleOnClickLike: PropTypes.func,
};
export default CommentEntries;