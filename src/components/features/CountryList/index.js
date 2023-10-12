import React, { useEffect, useState } from 'react';
import { fetchCountries } from '../../../services/countryService';
import { Link } from 'react-router-dom';
import '../../../styles/countryList.css';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const fetchedCountries = await fetchCountries();
        const sortedCountries = [...fetchedCountries].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedCountries);
      } catch (error) {
        console.error('Error loading countries', error);
        setError('Failed to load countries.');
      }
    };
    loadCountries();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="country-list">
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            <Link to={`/countries/${country.cca3}`}>
              {country.name.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
