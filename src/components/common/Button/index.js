import React from 'react';
import '../../../styles/button.css';

function Button({ type = "button", onClick, children }) {
    return (
        <button type={type} onClick={onClick} className="custom-button">
            {children}
        </button>
    );
}

export default Button;
