import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';
import '../../../styles/countrySelector.css';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchCountryByCode, getCapitalCoordinates } from '../../../services/countryService'; 

function CountrySelector({ setSelectedCountryCoordinates }) { 
  const { currentUser } = useAuth();
  const [countries, error] = useCountries();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    if (countries && countries.length) {
        setFilteredCountries(countries);
    }
  }, [countries]);

  useEffect(() => {
    if (countries) {
        setFilteredCountries(
            countries.filter(country => 
                country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }
  }, [searchTerm, countries]);

  const handleSelectCountry = async (country) => {
    if (!selectedCountries.includes(country.cca3)) {
      try {
        const countryData = await fetchCountryByCode(country.cca3);
        const capital = countryData.capital && countryData.capital[0]; 
        if (capital) {
          const coordinates = await getCapitalCoordinates(capital, country.cca3);
          setSelectedCountryCoordinates({ 
            ...coordinates,
            name: countryData.name.common,
            capital
          });
          setSelectedCountries([...selectedCountries, country.cca3]);
        }
      } catch (error) {
        console.error('Failed to fetch country data:', error);
      }
    } else {
      setSelectedCountries(selectedCountries.filter(c => c !== country.cca3));
    }
    setSearchTerm('');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentUser) {
    return <div>You need to be logged in to select countries.</div>;
  }

  return (
    <div className="wrapper">
      <h1>Select Countries</h1>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        placeholder="Zoek landen..."
      />
      <div className="search-results">
        {filteredCountries.map(country => (
          <div 
            key={country.cca3} 
            onClick={() => handleSelectCountry(country)}
          >
            {country.name.common}
          </div>
        ))}
      </div>
      <div className="selected-countries">
        {selectedCountries.map(cca3 => (
          <div key={cca3}>{countries.find(c => c.cca3 === cca3)?.name.common}</div>
        ))}
      </div>
    </div>
  );
}

export default CountrySelector;
