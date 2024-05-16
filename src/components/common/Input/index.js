import React from 'react';
import '../../../styles/input.css';

function Input({ onChange, ...props }) {
    return (
        <input className='custom-input' onChange={onChange} {...props} />
    );
}

export default Input;