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
        <main className="results-page-container">
            <header>
                <h1>Resultaten</h1>
            </header>
            <section>
                <div className="country-list-section">
                    <CountryList 
                        countries={selectedCountries} 
                        onCountrySelect={onCountrySelect} 
                    />
                </div>
                <div className="map-section">
                    <InteractiveMap selectedCountries={selectedCountryCodes} topCountries={wishListCountries} />
                </div>
            </section>
            <footer>
                <button onClick={handleBack}>Terug</button>
            </footer>
        </main>
    );
}

export default ResultsPage;
