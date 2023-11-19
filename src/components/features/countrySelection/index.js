import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';
import '../../../styles/countrySelection.css';

const CountrySelection = ({ onCountrySelect, selectedCountries, title }) => {
    const [localSelectedCountries, setLocalSelectedCountries] = useState(selectedCountries);
    const [allCountries] = useCountries();

    useEffect(() => {
        setLocalSelectedCountries(selectedCountries);
    }, [selectedCountries]);

    const handleCountrySelect = (event) => {
        const countryCode = event.target.value;
        const selectedCountry = allCountries.find(country => country.cca3 === countryCode);

        if (selectedCountry && !localSelectedCountries.includes(selectedCountry)) {
            const updatedCountries = [...localSelectedCountries, selectedCountry];
            setLocalSelectedCountries(updatedCountries);
            onCountrySelect(updatedCountries);
        }
    };
    

    const removeCountry = (countryToRemove) => {
        const newSelectedCountries = localSelectedCountries.filter(country => country.cca3 !== countryToRemove);
        setLocalSelectedCountries(newSelectedCountries);
        onCountrySelect(newSelectedCountries);
    };

    return (
        <div>
            <h3>{title}</h3>
            <select onChange={handleCountrySelect} value="">
                <option value="">Selecteer een land</option>
                {allCountries.map(country => (
                    <option key={country.cca3} value={country.cca3}>
                        {country.name.common}
                    </option>
                ))}
            </select>
            <div>
            Geselecteerde landen: 
                {localSelectedCountries.map((country, index) => {
                    return (
                        <span key={country.cca3}>
                            {country.name.common}
                            <button onClick={() => removeCountry(country.cca3)}>Verwijder</button>
                        </span>
                    );
                })}
            </div>
        </div>
    );
};
export default CountrySelection;