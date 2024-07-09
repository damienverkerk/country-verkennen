import React from 'react';
import './Input.css';
import PropTypes from 'prop-types';

function Input({ type = "text", onChange, className = "custom-input", ...props }) {
    return (
        <input type={type} onChange={onChange} className={className} {...props} />
    );
}

Input.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default Input;