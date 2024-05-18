import React from 'react';
import '../../../styles/rangeInput.css';

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
      />
      <span>{value}</span>
    </div>
  );
};

export default RangeInput;
