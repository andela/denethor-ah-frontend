import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const TextAreaInput = ({ text, className, placeholder }) => {
  return (
    <textarea 
      className={`textarea-input ${className}`} 
      defaultValue={text}
      placeholder={placeholder}
    />
  );
}

TextAreaInput.defaultProps = {
  placeholder: 'Your message',
};

TextAreaInput.propTypes = {
  text: PropTypes.string.isRequired
}

export default TextAreaInput;