import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const TextAreaInput = ({ className, placeHolder, onChange, value, autoFocus }) => {
  return (
    <textarea 
    className={`textarea-input ${className}`}  
    placeholder={placeHolder}
    onChange={onChange}
    value={value}
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus={autoFocus}
    />
  );
}

TextAreaInput.defaultProps = {
  placeholder: 'Your message',
};

TextAreaInput.propTypes = {
  className: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  autoFocus: PropTypes.bool
}

export default TextAreaInput;
