import React from 'react';

function Form({ onSubmit, children, className }) {
    return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    );
}

export default Form;