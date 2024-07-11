import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({ type = "button", onClick, children, className = "custom-button", ariaLabel }) {
    return (
        <button type={type} onClick={onClick} className={className} aria-label={ariaLabel}>
            {children}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
};

export default Button;
