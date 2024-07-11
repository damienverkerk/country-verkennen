import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';

const Select = ({ onChange, options, label, placeholder }) => (
  <div className="select-container">
    <label className="select-label">{label}</label>
    <select onChange={onChange} className="select-element" defaultValue="">
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
  placeholder: PropTypes.string.isRequired
};

export default Select;
