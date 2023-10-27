import React from 'react';
import  useCountries  from '../../../hooks/useCountries';
import { Link } from 'react-router-dom';
import '../../../styles/countryList.css';

function CountryList() {
  const [countries, error] = useCountries();

  const sortedCountries = countries ? [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common)) : [];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="country-list">
      <h1>Country List</h1>
      <ul>
        {sortedCountries.map((country) => (
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
