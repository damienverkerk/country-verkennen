import React, { useState } from 'react';
import CountryFilters from '../CountryFilters';
import CountryList from '../CountryList';
import CountryScores from '../CountryScores';

const CountryRecommender = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [preferences, setPreferences] = useState({
        languages: [],
        currency: '',
        populationRange: [0, 1000000000]
    });

    const handleCountrySelect = (countryCode) => {
        if (selectedCountries.includes(countryCode)) {
            setSelectedCountries(prev => prev.filter(code => code !== countryCode));
        } else if (selectedCountries.length < 10) {
            setSelectedCountries(prev => [...prev, countryCode]);
        } else {
            alert('Je kunt maximaal 10 landen selecteren.');
        }
    };

    const handleFilterChange = (key, value) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div>
            <h1>Landen Aanbeveler</h1>
            <CountryFilters onFilterChange={handleFilterChange} />
            <CountryList 
                onCountrySelect={handleCountrySelect} 
                selectedCountries={selectedCountries}
                preferences={preferences}
            />
            <CountryScores 
                selectedCountries={selectedCountries}
                preferences={preferences}
            />
        </div>
    );
};

export default CountryRecommender;
