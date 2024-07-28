import React from 'react';
import './RangeInput.css';
import PropTypes from 'prop-types';

const RangeInput = ({ label, min, max, value, onChange, id, name, autocomplete }) => {
  return (
    <div className="range-input">
      <label htmlFor={id} className="range-input-label">{label}</label>
      <input 
        id={id}
        name={name}
        type="range" 
        min={min} 
        max={max}
        value={value} 
        onChange={e => onChange(Number(e.target.value))} 
        className="range-input-slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        autoComplete={autocomplete}
      />
      <span className="range-input-value">{value}</span>
    </div>
  );
};

RangeInput.propTypes = {
    label: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    autocomplete: PropTypes.string
};

export default RangeInput;