import React from 'react';
import '../../../styles/rangeInput.css';

function RangeInput({ min, max, value, onChange }) {
  return (
    <div className='range-input'>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={onChange} 
      />
      <span>{value}</span>
    </div>
  );
}

export default RangeInput;
