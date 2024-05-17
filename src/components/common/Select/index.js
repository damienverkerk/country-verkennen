import React from 'react';
import '../../../styles/select.css';

function Select({ options, onChange, defaultOption }) {
  return (
    <select onChange={onChange}>
      <option value="">{defaultOption}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}

export default Select;
