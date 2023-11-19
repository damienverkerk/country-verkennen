import React, { useState, useEffect } from 'react';
import CountrySelection from '../countrySelection';
import CountryList from '../CountryList';
import InteractiveMap from '../InteractiveMap';
import { fetchCountryByCode, getCapitalCoordinates } from '../../../services/countryService';
import CountryFilters from '../CountryFilters';
import '../../../styles/dashboard.css';

const Dashboard = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [wishListCountries, setWishListCountries] = useState([]);
    const [selectedCountryCodes, setSelectedCountryCodes] = useState([]);
    console.log('Initial selected countries:', selectedCountries);
    const [filters, setFilters] = useState({
        language: '',
        region: '',
        currency: '',
        populationMin: 0,
        populationMax: Number.MAX_VALUE
    });
    const [step, setStep] = useState(1); 
    useEffect(() => {
        console.log('Selected countries after update:', selectedCountries);
    }, [selectedCountries]);

    const handleCountrySelect = async (selectedCountries) => {
        const countriesWithCoordinates = await Promise.all(selectedCountries.map(async (country) => {
            if (!country.lat || !country.lng) {
                const coordinates = await getCapitalCoordinates(country.capital, country.cca3);
                return { ...country, ...coordinates };
            }
            return country;
        }));
    
        setSelectedCountries(countriesWithCoordinates);
    };
    

    const handleWishListSelect = async (selectedCountries) => {
        const countriesWithCoordinates = await Promise.all(selectedCountries.map(async (country) => {
            if (!country.lat || !country.lng) {
                const coordinates = await getCapitalCoordinates(country.capital, country.cca3);
                return { ...country, ...coordinates };
            }
            return country;
        }));
    
        setWishListCountries(countriesWithCoordinates);
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

    const nextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    return (
        <div className="dashboard-container">
            {step === 1 && (
    <section className="dashboard-section country-selection">
        <h1>In welke landen ben je geweest?</h1>
        <CountrySelection 
            onCountrySelect={handleCountrySelect} 
            selectedCountries={selectedCountries}
            title="Bezochte landen"/>
        <button onClick={nextStep}>Volgende</button>
    </section>
)}

{step === 2 && (
    <>
        <section className="dashboard-section country-selection">
            <CountrySelection 
                onCountrySelect={handleWishListSelect}
                selectedCountries={wishListCountries}
                title="Wenslijst landen" />
        <button onClick={prevStep}>Terug</button>
        <button onClick={nextStep}>Volgende</button>
        </section>
    </>
)}

            {step === 3 && (
                <>
                    <section className="dashboard-section country-filters">
                        <CountryFilters onFilterChange={handleFilterChange} />
                    <button onClick={prevStep}>Terug</button>
                    <button onClick={nextStep}>Volgende</button>
                    </section>
                </>
            )}

            {step === 4 && (
                <>
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
                        <InteractiveMap selectedCountries={selectedCountries} wishListCountries={wishListCountries}/>
                    </div>
                    <button onClick={prevStep}>Terug</button>
                </>
            )}
        </div>
    );
}

export default Dashboard;