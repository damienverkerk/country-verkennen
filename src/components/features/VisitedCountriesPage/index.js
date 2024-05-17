import React from 'react';
import CountrySelection from '../CountrySelection';
import { useNavigate } from 'react-router-dom';

const VisitedCountriesPage = ({ selectedCountries, onCountrySelect }) => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/wishlist');
    };

    return (
        <div className="page-container">
            <header>
                <h1>In welke landen ben je geweest?</h1>
            </header>
            <main>
                <CountrySelection 
                    onCountrySelect={onCountrySelect} 
                    selectedCountries={selectedCountries}
                    title="Bezochte landen"
                />
            </main>
            <footer>
                <button onClick={handleNext}>Volgende</button>
            </footer>
        </div>
    );
}

export default VisitedCountriesPage;
