import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';
import '../../../styles/filteredCountryList.css';

const MultiSelectDropdown = ({ onSelect }) => {
    const [allCountries] = useCountries();
    const [filteredCountries, setFilteredCountries] = useState(allCountries);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.closest('.multi-select-dropdown')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    return (
        <div className="multi-select-dropdown">
            <input 
                type="text" 
                placeholder="Zoek landen..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div 
                className="dropdown-button"
                onClick={toggleDropdown} 
            >
                Selecteer landen
            </div>
            {dropdownOpen && (
                <div className="dropdown-content">
                    {filteredCountries.map(country => (
                        <div 
                            key={country.cca3} 
                            onClick={() => handleSelect(country.cca3)}
                            className={`option ${selectedCountries.includes(country.cca3) ? 'selected' : ''}`}
                        >
                            {country.name.common}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
