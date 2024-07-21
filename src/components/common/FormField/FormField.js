import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import './FormField.css';

const FormField = ({ label, id, error, ...inputProps }) => (
  <div className="form-field">
    <label htmlFor={id} className="form-field-label">
      {label}
    </label>
    <Input id={id} {...inputProps} />
    {error && <span className="form-field-error" role="alert">{error}</span>}
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default FormField;