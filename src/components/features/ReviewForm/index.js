import React, { useState } from 'react';
import '../../../styles/reviewForm.css';

const ReviewForm = ({ countryCode, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        onSubmit({ countryCode, rating, comment });
        setRating(0);
        setComment('');
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Laat een recensie achter</legend>
                <label>
                    Beoordeling:
                    <select 
                        value={rating} 
                        onChange={(e) => setRating(Number(e.target.value))}
                        aria-label="Rating"
                        required
                    >
                        <option value={0}>Kies een beoordeling</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </label>
                <label>
                    Opmerking:
                    <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Schrijf je recensie hier..."
                        aria-label="Comment"
                        required 
                    />
                </label>
                <button type="submit">Verstuur</button>
            </fieldset>
        </form>
    );
};

export default ReviewForm;
