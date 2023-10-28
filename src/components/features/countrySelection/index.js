import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';

const CountrySelection = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [allCountries] = useCountries();
    
    const handleCountrySelect = (event) => {
        const country = event.target.value;
        if (!selectedCountries.includes(country)) {
            setSelectedCountries([...selectedCountries, country]);
        }
    }

    return (
        <div>
            <select onChange={handleCountrySelect}>
                <option value="">Selecteer een land</option>
                {allCountries.map(country => (
                    <option key={country.cca3} value={country.cca3}>
                        {country.name.common}
                    </option>
                ))}
            </select>
            <div>
                Geselecteerde landen: {selectedCountries.join(', ')}
            </div>
        </div>
    );
}

export default CountrySelection;
