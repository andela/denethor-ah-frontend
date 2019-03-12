import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    type,
    onClick,
    isRequestSent,
    value,
    className
}) => (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={isRequestSent}
        >
            {value}
        </button>
    );

Button.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isRequestSent: PropTypes.bool,
    value: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};

Button.defaultProps = {
    onClick: '',
    isRequestSent: false
};

export default Button;
