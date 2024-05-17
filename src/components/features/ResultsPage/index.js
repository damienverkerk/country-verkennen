import React from 'react';
import CountryList from '../CountryList';
import InteractiveMap from '../InteractiveMap';
import { useNavigate } from 'react-router-dom';

const ResultsPage = ({ selectedCountries, wishListCountries, selectedCountryCodes, preferences, onCountrySelect }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/filters');
    };

    return (
        <div className="results-page-container">
            <header>
                <h1>Resultaten</h1>
            </header>
            <main>
                <section className="country-list-section">
                    <CountryList 
                        onCountrySelect={onCountrySelect} 
                        selectedCountryCodes={selectedCountryCodes} 
                        preferences={preferences} 
                    />
                </section>
                <section className="map-section">
                    <InteractiveMap selectedCountries={selectedCountries} wishListCountries={wishListCountries} />
                </section>
            </main>
            <footer>
                <button onClick={handleBack}>Terug</button>
            </footer>
        </div>
    );
}

export default ResultsPage;
