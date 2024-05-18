import React, { useEffect, useState } from 'react';
import '../../../styles/countryDetail.css';
import { fetchCountryByCode } from '../../../services/countryService';
import InteractiveMap from '../InteractiveMap';
import Loading from '../../common/Loading';

const CountryDetail = ({ countryCode, selectedCountries, topCountries }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const data = await fetchCountryByCode(countryCode);
      setCountry(data);
    };
    fetchCountry();
  }, [countryCode]);

  if (!country) {
    return <Loading />;
  }

  return (
    <section className="country-detail">
      <h2>{country.name.common}</h2>
      <p><strong>Official Name:</strong> {country.name.official}</p>
      <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
      <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(cur => cur.name).join(', ') : 'N/A'}</p>
      <InteractiveMap 
        selectedCountryCode={countryCode} 
        selectedCountries={selectedCountries}
        topCountries={topCountries}
      />
    </section>
  );
};

export default CountryDetail;
