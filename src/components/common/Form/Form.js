import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

function Form({ onSubmit, children, className = "form" }) {
    return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    );
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Form;