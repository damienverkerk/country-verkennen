import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';
import CountryFilters from '../CountryFilters';
import Button from '../../common/Button';
import '../../../styles/filteredCountryList.css';

const FilteredCountryList = () => {
    const [allCountries, error] = useCountries();
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filters, setFilters] = useState({
        populationMin: 0,
        populationMax: Number.MAX_VALUE
    });
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 15;

    useEffect(() => {
        if (allCountries && allCountries.length) {
            setFilteredCountries(allCountries);
        }
    }, [allCountries]);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = allCountries.filter(country => {
                return (
                    (!filters.language || (country.languages && typeof country.languages === 'object' && Object.values(country.languages).includes(filters.language))) &&
                    (!filters.region || country.subregion === filters.region) &&
                    (!filters.currency || (country.currencies && typeof country.currencies === 'object' && Object.values(country.currencies).some(cur => cur.name === filters.currency))) &&
                    country.population >= filters.populationMin &&
                    country.population <= filters.populationMax
                );
            });
            
            setCurrentPage(1); 
            setFilteredCountries(filtered);
        };

        applyFilters();
    }, [filters, allCountries]);

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredCountries.slice(indexOfFirstResult, indexOfLastResult);

    function adjustFontSize(text) {
        const maxLength = 18;  
        let currentSize = 18;  

        if (text.length > maxLength) {
            const reductionFactor = maxLength / text.length;
            currentSize = Math.floor(currentSize * reductionFactor);
        }
        
        return `${currentSize}px`;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="wrapper">
<div className="dashboard-container">
<CountryFilters onFilterChange={(key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    }} />

    <div className="country-cards-container country-card-container">
        {currentResults.map(country => (
            <div key={country.cca3} className="country-card">
                <img src={country.flags.png} alt={`${country.name.common} vlag`} className="country-flag"/>
                <div className="country-details" style={{fontSize: adjustFontSize(country.name.common)}}>
                    <p>{country.name.common}</p>
                </div>
            </div>
        ))}
    </div>
</div>
<div className="pagination-controls">
    <Button 
        id="custom-button"
        disabled={currentPage === 1} 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    >
        Vorige
    </Button>
    <span>{currentPage}</span>
    <Button 
        id="custom-button"
        disabled={currentPage === Math.ceil(filteredCountries.length / resultsPerPage)}
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredCountries.length / resultsPerPage)))}
    >
        Volgende
    </Button>
</div>
</div>
    );
};

export default FilteredCountryList;