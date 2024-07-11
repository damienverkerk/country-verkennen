import { useState, useCallback } from 'react';

const useReviewForm = (onSubmit) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleRatingChange = useCallback((newRating) => {
    setRating(newRating);
    setError('');
  }, []);

  const handleCommentChange = useCallback((e) => {
    setComment(e.target.value);
    setError('');
  }, []);

  const handleSubmit = useCallback((e) => {
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
  }, [rating, comment, onSubmit]);

  return {
    rating,
    comment,
    error,
    handleRatingChange,
    handleCommentChange,
    handleSubmit
  };
};

export default useReviewForm;
