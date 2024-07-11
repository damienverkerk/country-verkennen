import React from 'react';
import PropTypes from 'prop-types';

function Form({ onSubmit, children, className }) {
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
