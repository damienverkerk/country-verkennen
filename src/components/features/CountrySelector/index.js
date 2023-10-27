import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';
import '../../../styles/countrySelector.css';
import { useAuth } from '../../../contexts/AuthContext';

function CountrySelector() {
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

  const handleSelectCountry = (country) => {
    if (selectedCountries.includes(country.cca3)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country.cca3));
    } else if (selectedCountries.length < 10) {
      setSelectedCountries([...selectedCountries, country.cca3]);
    } else if (selectedCountries.length >= 10) {
      alert('Je kunt maximaal 10 landen selecteren.');
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
