import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../../services/countryService';
import CountryFilters from '../CountryFilters';
import Button from '../../common/Button';
import '../../../styles/filteredCountryList.css';
const FilteredCountryList = () => {
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

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

    const indexOfLastResult = currentPage * resultsPerPage
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredCountries.slice(indexOfFirstResult, indexOfLastResult);
    return (
        <div className="dashboard-container">
            <CountryFilters onFilterChange={(key, value) => {
                console.log("Filter Change Triggered:", key, value);
                setFilters(prev => ({ ...prev, [key]: value }));
            }} />
    
            <div className="country-cards-container country-card-container">
                {currentResults.map(country => (
                    <div key={country.cca3} className="country-card">
                        <img src={country.flags.png} alt={`${country.name.common} vlag`} className="country-flag"/>
                        <div className="country-details">
                            <p>{country.name.common}</p>
                        </div>
                    </div>
                ))}
            </div>
    
            <div className="pagination-controls">
    <Button 
        disabled={currentPage === 1} 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    >
        Vorige
    </Button>
    <span>{currentPage}</span>
    <Button 
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
