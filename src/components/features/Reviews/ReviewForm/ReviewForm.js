import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import RatingInput from '../../../common/RatingInput/RatingInput';
import ErrorMessage from '../../../common/ErrorMessage/ErrorMessage';
import useReviewForm from './useReviewForm';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit, countryName }) => {
  const { rating, comment, error, handleRatingChange, handleCommentChange, handleSubmit } = useReviewForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="review-form" aria-labelledby="review-form-title">
      <h2 id="review-form-title">Leave a Review for {countryName}</h2>
      
      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        <RatingInput
          id="rating"
          value={rating}
          onChange={handleRatingChange}
          max={5}
          required
          aria-required="true"
        />
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <Input
          id="comment"
          type="textarea"
          value={comment}
          onChange={handleCommentChange}
          required
          minLength={10}
          aria-describedby="comment-description"
          aria-required="true"
        />
        <small id="comment-description">Please provide a comment of at least 10 characters.</small>
      </div>

      {error && <ErrorMessage message={error} />}

      <Button type="submit">Submit Review</Button>
    </form>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  countryName: PropTypes.string.isRequired,
};

export default ReviewForm;
