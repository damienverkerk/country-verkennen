import React from 'react';
import './Select.css';

const Select = ({ label, options, onChange }) => {
  return (
    <div className="select-input">
      <label>{label}</label>
      <select onChange={onChange}>
        <option value="">Selecteer een optie</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;