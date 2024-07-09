import React from 'react';
import './RangeInput.css';
import PropTypes from 'prop-types';

const RangeInput = ({ label, min, max, value, onChange }) => {
  return (
    <div className="range-input">
      <label>{label}</label>
      <input 
        type="range" 
        min={min} 
        max={max}
        value={value} 
        onChange={e => onChange(Number(e.target.value))} 
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <span>{value}</span>
    </div>
  );
};

RangeInput.propTypes = {
    label: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default RangeInput;