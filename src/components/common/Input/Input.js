import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input({ type = "text", onChange, className = "custom-input", ...props }) {
    return (
        <input 
            type={type} 
            onChange={onChange} 
            className={className} 
            aria-label={props.label}
            {...props} 
        />
    );
}

Input.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
};

export default Input;
