import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from '../../components/common/ImageCarousel/ImageCarousel';
import BookingSection from '../../components/features/Booking/BookingSection/BookingSection';
import useCountries from '../../hooks/useCountries';
import { fetchImagesByCountry } from '../../services/imageService';
import Card from '../../components/common/Card/Card';
import './CountryDetailPage.css';

const CountryDetailPage = () => {
  const { countryCode } = useParams();
  const [countries] = useCountries();
  const country = countries.find(c => c.cca3 === countryCode);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (country) {
      fetchImagesByCountry(country.name.common).then(setImages);
    }
  }, [country]);

  if (!country) {
    return <div>Land niet gevonden</div>;
  }

  const countryName = country.name.common || "Onbekend";
  const capital = country.capital ? country.capital[0] : "Onbekend";

  const getLanguages = (languages) => {
    return languages ? Object.values(languages).join(', ') : 'Onbekend';
  };

  return (
    <div className="country-detail-page">
      <ImageCarousel images={images} />
      <div className="country-facts-grid">
        <Card title="Language" icon="fa-language">
          <p className="fact-value">{getLanguages(country.languages)}</p>
        </Card>
        <Card title="Population" icon="fa-users">
          <p className="fact-value">{country.population.toLocaleString()}</p>
        </Card>
        <Card title="Region" icon="fa-globe">
          <p className="fact-value">{country.region}</p>
        </Card>
        <Card title="Subregion" icon="fa-map">
          <p className="fact-value">{country.subregion || 'Onbekend'}</p>
        </Card>
        <Card title="Capital" icon="fa-landmark">
          <p className="fact-value">{capital}</p>
        </Card>
      </div>
      <BookingSection country={country} />
    </div>
  );
};

export default CountryDetailPage;