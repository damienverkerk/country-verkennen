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
        <main className="page-container">
            <header>
                <h1>Pas filters toe</h1>
            </header>
            <section>
                <CountryFilters onFilterChange={onFilterChange} />
            </section>
            <footer>
                <button onClick={handleBack}>Terug</button>
                <button onClick={handleNext}>Volgende</button>
            </footer>
        </main>
    );
}

export default FiltersPage;
