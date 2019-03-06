import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const TextAreaInput = ({ text }) => {
  return (
    <textarea className='textarea-input' defaultValue={text} />
  );
}

TextAreaInput.propTypes = {
  text: PropTypes.string.isRequired
}

export default TextAreaInput;