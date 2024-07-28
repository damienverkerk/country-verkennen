import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';

const Select = ({ onChange, options, label, placeholder, id, name, autocomplete }) => (
  <div className="select-container">
    <label htmlFor={id} className="select-label">{label}</label>
    <select 
      id={id} 
      name={name} 
      onChange={onChange} 
      className="select-element" 
      defaultValue=""
      autoComplete={autocomplete}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  autocomplete: PropTypes.string
};

export default Select;