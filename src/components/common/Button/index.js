 import React from 'react';
 import '../../../styles/button.css';

 function Button({ onClick, children, ...props }){
    return(
        <button className='custom-button' onClick={onClick} {...props}>
            {children}
        </button>
    );
 }
export default Button;