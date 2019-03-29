import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { TextAreaInput } from '../textarea';
import Button from '../Button';

export default class Comment extends Component {
  state = {
    comment: '',
    toastOptions: {
      hideProgressBar: true,
      closeButton: false,
      toastId: "commentToast",
      className: "toast-custom-style"
    }
  };

  handleOnChangeComment = ({ target: { value } }) => {
    this.setState({ comment: value });
  }

  handleOnClick = async (e) => {
    e.preventDefault();
    const { state: { comment, toastOptions }, props: { handleOnClick } } = this;

    if (!comment) return toast.error('Comment field cannot be empty', toastOptions);
    await handleOnClick(comment);
  }

  render() {
    const { 
      state: { comment }, props: { id }, handleOnChangeComment, handleOnClick 
    } = this;

    return (
      <div className='comment-create-field'>
        <TextAreaInput
          className={`article-comment-field ${id}`}
          placeHolder='Your message'
          value={comment}
          onChange={handleOnChangeComment}
        />
        <Button
          className='article-comment-field__button'
          type='submit'
          value='submit'
          onClick={handleOnClick}
        />
      </div>
    );
  }
}

Comment.propTypes = {
  handleOnClick: PropTypes.func,
  id: PropTypes.string
}
