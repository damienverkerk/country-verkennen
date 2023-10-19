import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../../services/countryService';
import CountryFilters from '../CountryFilters'; // Zorg ervoor dat je het juiste pad hier hebt.
import '../../../styles/filteredCountryList.css';
const FilteredCountryList = () => {
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filters, setFilters] = useState({});

    const applyFilters = async () => {
        try {
            const countries = await fetchCountries();
            const filtered = countries.filter(country => {
                return (
                    (!filters.language || (country.languages && typeof country.languages === 'object' && Object.values(country.languages).includes(filters.language))) &&
                    (!filters.region || country.subregion === filters.region) &&
                    (!filters.currency || (country.currencies && typeof country.currencies === 'object' && Object.values(country.currencies).some(cur => cur.name === filters.currency))) &&
                    (!filters.populationMin || country.population >= filters.populationMin) &&
                    (!filters.populationMax || country.population <= filters.populationMax)
                );
            });
            
            setFilteredCountries(filtered);
        } catch (error) {
            console.error("Error while applying filters:", error);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [filters]);

    return (
        <div className="filtered-country-list">
            <h2>Gefilterde landen</h2>
    
            {/* Filters Component */}
            <CountryFilters onFilterChange={(key, value) => {
                console.log("Filter Change Triggered:", key, value);
                setFilters(prev => ({ ...prev, [key]: value }));
            }} />
    
            {/* Lijst van landen */}
            <ul>
                {filteredCountries.map(country => (
                    <li key={country.cca3}>
                        <span className="country-name">{country.name.common}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default FilteredCountryList;
