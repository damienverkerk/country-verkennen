import React from 'react';
import PropTypes from 'prop-types';
import './RatingInput.css';

const RatingInput = ({ value, onChange, max = 5 }) => (
  <div className="rating-input">
    {[...Array(max)].map((star, index) => {
      const ratingValue = index + 1;
      return (
        <label key={index}>
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => onChange(ratingValue)}
            aria-label={`Rating ${ratingValue}`}
          />
          <span className={`star ${ratingValue <= value ? 'filled' : ''}`} aria-hidden="true">&#9733;</span>
        </label>
      );
    })}
  </div>
);

RatingInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number
};

export default RatingInput;
