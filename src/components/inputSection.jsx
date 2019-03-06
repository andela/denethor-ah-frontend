import React from 'react';
import PropTypes from 'prop-types';

const InputSection = ({
    id,
    placeHolder,
    onChange,
    onKeyPress,
    type,
    className,
    Ref,
    name,
    onKeyUp,
    onBlur,
    onFocus
}) => (
    <input
      type={type}
      className={className}
      id={id}
      required
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeHolder}
      ref={Ref}
      name={name}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
      onFocus={onFocus}
    />
);
InputSection.propTypes = {
    id: PropTypes.string,
    placeHolder: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    Ref: PropTypes.objectOf(PropTypes.any),
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onKeyUp: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func
};

export default InputSection;