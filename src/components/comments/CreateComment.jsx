import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Comment from './Comment';
import toastOptions from '../../utils/toastOptions';

const CreateComment = ({ articleId, addComment }) => {
  const handleOnClick = (commentBody) => {
    addComment({ articleId, commentBody })
    .then()
    .catch(error => {
    const { response } = error;
      if (response && response.status === 422) {
        return toast.error(error.response.data.message.details[0].message, toastOptions);
      } else if (response && response.status === 401) {
        toast.error('Login to comment on this article', toastOptions);
      } else {
        toast.error('Server error occured', toastOptions);
      }
    });
  }

  return (
    <Comment handleOnClick={handleOnClick} />
  );
}

CreateComment.propTypes = {
  articleId: PropTypes.string.isRequired,
  addComment: PropTypes.func,
  value: PropTypes.string,
};

export default CreateComment;
