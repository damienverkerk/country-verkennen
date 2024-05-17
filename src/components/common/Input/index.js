import React from 'react';
import '../../../styles/input.css';

function Input({ type = "text", onChange, ...props }) {
    return (
        <input type={type} onChange={onChange} className="custom-input" {...props} />
    );
}

export default Input;
