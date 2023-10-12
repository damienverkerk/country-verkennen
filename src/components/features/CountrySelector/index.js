import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../../services/countryService';
import '../../../styles/countrySelector.css'; // Vergeet niet dit pad aan te passen als je de stijl in een andere map plaatst
import { useAuth } from '../../../contexts/AuthContext';
import {Link} from 'react-router-dom';

function CountrySelector() {
  const { currentUser } = useAuth();
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const fetchedCountries = await fetchCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error('Error loading countries', error);
        setError('Failed to load countries.');
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    if(currentUser) {
      localStorage.setItem(`selectedCountries-${currentUser.username}`,JSON.stringify(selectedCountries));
    }
  }, [selectedCountries,currentUser]);


  const handleSelectCountry = (country) => {
    if (selectedCountries.includes(country.cca3)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country.cca3));
    } else {
      setSelectedCountries([...selectedCountries, country.cca3]);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentUser) {
    return(
      <div>
        <p>You need to be logged in to select countries. <Link to="/login">Login Here</Link></p>
      </div>
    )
  }

  return (
    <div className="country-selector">
      <h1>Select Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            <input 
              type="checkbox" 
              checked={selectedCountries.includes(country.cca3)}
              onChange={() => handleSelectCountry(country)}
            />
            {country.name.common}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountrySelector;
