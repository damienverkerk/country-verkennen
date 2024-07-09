import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

function Button({ type = "button", onClick, children, className = "custom-button" }) {
    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default Button;