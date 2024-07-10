import React from 'react';
import PropTypes from 'prop-types';
import './FormGroup.css';

const FormGroup = ({ children, label, className = '' }) => (
  <fieldset className={`form-group ${className}`}>
    {label && <legend className="form-group-label">{label}</legend>}
    {children}
  </fieldset>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  className: PropTypes.string
};

export default FormGroup;
