import React from 'react';
import '../../../styles/countryList.css';
import Card from '../../common/Card';

const CountryList = ({ countries, onCountrySelect }) => {
  if (!countries || countries.length === 0) {
    return <div>Geen landen gevonden</div>;
  }

  return (
    <section className="country-list">
      {countries.slice(0, 10).map(country => (
        <Card key={country.cca3} className="country-card" onClick={() => onCountrySelect(country.cca3)}>
          <img src={country.flags.png} alt={`${country.name.common} vlag`} className="country-flag" />
          <div className="country-card-details">
            <h3>{country.name.common}</h3>
            <p>Bevolking: {country.population.toLocaleString()}</p>
            <p>Regio: {country.region}</p>
            <p>Subregio: {country.subregion}</p>
            <p>Score: {country.score.toFixed(2)}%</p>
          </div>
        </Card>
      ))}
    </section>
  );
};

export default CountryList;
