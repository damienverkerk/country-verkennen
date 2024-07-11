import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from '../../components/common/ImageCarousel/ImageCarousel';
import BookingSection from '../../components/features/Booking/BookingSection/BookingSection';
import useCountries from '../../hooks/useCountries';
import { fetchImagesByCountry } from '../../services/imageService';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import CountryFact from '../../components/common/CountryFact/CountryFact';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage';
import Loading from '../../components/common/Loading/Loading';
import './CountryDetailPage.css';

const CountryDetailPage = () => {
  const { countryCode } = useParams();
  const [countries, loading] = useCountries();
  const [country, setCountry] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (countries.length > 0) {
      const foundCountry = countries.find(c => c.cca3 === countryCode);
      setCountry(foundCountry);
      if (foundCountry) {
        fetchImagesByCountry(foundCountry.name.common).then(setImages);
      }
    }
  }, [countries, countryCode]);

  if (loading) {
    return <Loading />;
  }

  if (!country) {
    return <ErrorMessage message="Land niet gevonden" />;
  }

  const countryName = country.name.common || "Onbekend";
  const capital = country.capital ? country.capital[0] : "Onbekend";
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'Onbekend';

  return (
    <PageLayout title={countryName}>
      <article className="country-detail">
        <ImageCarousel images={images} />
        <section className="country-facts-grid" aria-labelledby="country-facts-title">
          <h2 id="country-facts-title" className="visually-hidden">Land Feiten</h2>
          <CountryFact title="Taal" icon="fa-language" value={languages} />
          <CountryFact title="Bevolking" icon="fa-users" value={country.population.toLocaleString()} />
          <CountryFact title="Regio" icon="fa-globe" value={country.region} />
          <CountryFact title="Subregio" icon="fa-map" value={country.subregion || 'Onbekend'} />
          <CountryFact title="Hoofdstad" icon="fa-landmark" value={capital} />
        </section>
        <BookingSection country={country} />
      </article>
    </PageLayout>
  );
};

export default CountryDetailPage;
