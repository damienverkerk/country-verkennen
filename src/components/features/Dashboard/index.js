import React, { useState } from 'react';
import CountrySelection from '../countrySelection';
import MultiSelectDropdown from '../MultiSelectDropdown';
import CountryRecommender from '../CountryRecommender';
import CountryList from '../CountryList';
import InteractiveMap from '../InteractiveMap';
import { fetchCountryByCode, getCapitalCoordinates } from '../../../services/countryService';
import CountryFilters from '../CountryFilters';
import '../../../styles/dashboard.css';

const Dashboard = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCountryCodes, setSelectedCountryCodes] = useState([]);
    const [filters, setFilters] = useState({
        language: '',
        region: '',
        currency: '',
        populationMin: 0,
        populationMax: Number.MAX_VALUE
    });

    const handleCountrySelect = async (countryCode) => {
        try {
            const countryData = await fetchCountryByCode(countryCode);
            const alreadySelected = selectedCountries.some(c => c.cca3 === countryCode);

            if (alreadySelected) {
                setSelectedCountries(selectedCountries.filter(c => c.cca3 !== countryCode));
            } else {
                const capital = countryData.capital && countryData.capital[0];
                if (capital) {
                    const coordinates = await getCapitalCoordinates(capital, countryCode);
                    setSelectedCountries([
                        ...selectedCountries,
                        {
                            ...coordinates,
                            name: countryData.name.common,
                            capital: capital,
                            cca3: countryCode
                        }
                    ]);
                }
            }
        } catch (error) {
            console.error('Failed to fetch country data or coordinates:', error);
        }
    };

    const handleFilterChange = (filterKey, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterKey]: value
        }));
    };

    const handleDropdownSelect = (selectedCodes) => {
        setSelectedCountryCodes(selectedCodes);
    };

    return (
        <div className="dashboard-container">
            <div className="filters-container">
                <section className="dashboard-section country-selection">
                    <CountrySelection onCountrySelect={handleCountrySelect} />
                </section>

                <section className="dashboard-section filters-dropdown">
                    <MultiSelectDropdown onSelect={handleDropdownSelect} />
                </section>

                <section className="dashboard-section country-filters">
                    <CountryFilters onFilterChange={handleFilterChange} />
                </section>
            </div>
            
            <div className="country-list-section">
                <section className="dashboard-section country-list">
                    <CountryList 
                        onCountrySelect={handleCountrySelect} 
                        selectedCountryCodes={selectedCountryCodes} 
                        preferences={filters} 
                    />
                </section>
            </div>

            <div className="map-section">
                <InteractiveMap selectedCountries={selectedCountries} />
            </div>
        </div>
    );
}

export default Dashboard;
