import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Comment from '../comments/Comment';
import { addHighlight } from '../../redux/actions/highlight';
import toastOptions from '../../utils/toastOptions';
import './styles.scss';

class CreateHighlight extends Component {
  state = {
    isOpen: true 
  }

  handleOnClick = async (comment) => {
    const { props: { isLoggedIn, articleId, highlightText, addHighlight } } = this;
    if (!isLoggedIn) return toast.error('Login to access this feature', toastOptions);

    const { error, message } = await addHighlight(articleId, { comment, highlight: highlightText });
    if (error) return toast.error(error, toastOptions);
    toast.success(message, toastOptions);
    setTimeout(() => this.setState({ isOpen: false }), 5000);
  }

  render() {
    const { props: { display, highlightText, id }, state: { isOpen }, handleOnClick } = this;

    return (
      <div className={`highlight-comment-textarea ${display && isOpen ? 'active' : ''}`}>
        <div className='ellipses'>{highlightText}</div>
        <Comment id={id} handleOnClick={handleOnClick} />
      </div>
    );
  }
}

CreateHighlight.propTypes = {
  readerId: PropTypes.string,
  articleId: PropTypes.string,
  highlightText: PropTypes.string,
  addHighlight: PropTypes.func,
  display: PropTypes.bool,
  id: PropTypes.string,
  text: PropTypes.string,
  isLoggedIn: PropTypes.bool
};

const mapStateToProps = ({ auth: { isLoggedIn = false } }) => ({ isLoggedIn });
const mapDispatchToProps = ({ addHighlight });

export default connect(mapStateToProps, mapDispatchToProps)(CreateHighlight);