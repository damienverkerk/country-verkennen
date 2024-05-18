import React from 'react';
import { useParams } from 'react-router-dom';
import '../../../styles/countryDetail.css';

const CountryDetail = ({ allCountries }) => {
  const { countryCode } = useParams();
  const country = allCountries.find(country => country.cca3 === countryCode);

  if (!country) {
    return <div>Land niet gevonden</div>;
  }

  return (
    <div className="country-detail-container">
      <h2>{country.name.common}</h2>
      <p>Regio: {country.region}</p>
      <p>Subregio: {country.subregion}</p>
      <p>Bevolking: {country.population}</p>
      <p>Oppervlakte: {country.area} km²</p>
      {/* Voeg meer landdetails toe hier */}
    </div>
  );
};

export default CountryDetail;
