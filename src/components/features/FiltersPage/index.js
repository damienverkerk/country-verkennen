import React from 'react';
import CountryFilters from '../CountryFilters';
import { useNavigate } from 'react-router-dom';

const FiltersPage = ({ onFilterChange }) => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/results');
    };

    const handleBack = () => {
        navigate('/wishlist');
    };

    return (
        <div className="page-container">
            <header>
                <h1>Pas filters toe</h1>
            </header>
            <main>
                <CountryFilters onFilterChange={onFilterChange} />
            </main>
            <footer>
                <button onClick={handleBack}>Terug</button>
                <button onClick={handleNext}>Volgende</button>
            </footer>
        </div>
    );
}

export default FiltersPage;
