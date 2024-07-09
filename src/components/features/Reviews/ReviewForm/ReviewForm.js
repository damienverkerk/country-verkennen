import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import RatingInput from '../../../common/RatingInput/RatingInput';
import ErrorMessage from '../../../common/ErrorMessage/ErrorMessage';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit, countryName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Please provide a comment of at least 10 characters');
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="review-form" aria-labelledby="review-form-title">
      <h2 id="review-form-title">Leave a Review for {countryName}</h2>
      
      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        <RatingInput
          id="rating"
          value={rating}
          onChange={setRating}
          max={5}
        />
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <Input
          id="comment"
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          minLength={10}
          aria-describedby="comment-description"
        />
        <small id="comment-description">Please provide a comment of at least 10 characters.</small>
      </div>

      <ErrorMessage message={error} />

      <Button type="submit">Submit Review</Button>
    </form>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  countryName: PropTypes.string.isRequired,
};

export default ReviewForm;