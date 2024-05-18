import React from 'react';
import CountryCard from '../CountryCard'; // Controleer of dit pad klopt naar de CountryCard component
import '../../../styles/topCountries.css'; // Maak deze CSS file als deze nog niet bestaat

const TopCountries = ({ countries = [] }) => {
  // Neem de top 3 landen van de lijst
  const topCountries = countries.slice(0, 3);

  return (
    <div className="top-countries-container">
      <h2>Top 3 Landen</h2>
      <div className="top-countries-list">
        {topCountries.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default TopCountries;
