import React from 'react';
import { useParams } from 'react-router-dom';
import  useCountries  from '../../../hooks/useCountries';
import '../../../styles/countryDetail.css';

function CountryDetail() {
  const { cca3 } = useParams();
  const [countries, error] = useCountries();  

  const country = countries ? countries.find(c => c.cca3 === cca3) : null;

  if (error) {
    return <div>{error}</div>;
  }

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="country-detail">
    <h1>{country.name.common}</h1>
    <p><strong>Capital:</strong> {country.capital && country.capital[0]}</p>
    <p><strong>Population:</strong> {country.population}</p>
    <p><strong>Region:</strong> {country.region}</p>
    <p><strong>Subregion:</strong> {country.subregion}</p>
    <p><strong>Area:</strong> {country.area} km²</p>
    <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
    <p><strong>Currencies:</strong> {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
    <p><strong>Flag:</strong></p>
    <img src={country.flags.png} alt={`${country.name.common} flag`} width="100" />
  </div>
  );
}

export default CountryDetail;
