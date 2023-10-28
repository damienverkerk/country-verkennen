import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';

const MultiSelectDropdown = ({ onSelect }) => {
    const [allCountries] = useCountries();
    const [filteredCountries, setFilteredCountries] = useState(allCountries);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountries, setSelectedCountries] = useState([]);

    useEffect(() => {
        setFilteredCountries(
            allCountries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, allCountries]);

    const handleSelect = (cca3) => {
        if (selectedCountries.includes(cca3)) {
            setSelectedCountries(prev => prev.filter(code => code !== cca3));
        } else {
            setSelectedCountries(prev => [...prev, cca3]);
        }
        onSelect(cca3);
    };

    return (
        <div className="multi-select-dropdown">
            <input 
                type="text" 
                placeholder="Zoek landen..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="dropdown-content">
                {filteredCountries.map(country => (
                    <div 
                        key={country.cca3} 
                        onClick={() => handleSelect(country.cca3)}
                        className={selectedCountries.includes(country.cca3) ? 'selected' : ''}
                    >
                        {country.name.common}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
