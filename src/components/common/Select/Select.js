import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';

const Select = ({ label, options, onChange }) => {
  return (
    <div className="select-input">
      <label>{label}</label>
      <select onChange={onChange} aria-label={label}>
        <option value="">Selecteer een optie</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
