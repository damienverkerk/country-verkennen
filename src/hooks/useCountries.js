import { useState, useEffect } from 'react';
import { fetchCountries } from '../services/countryService';

export default function useCountries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const fetchedCountries = await fetchCountries();
        setCountries(fetchedCountries);
      } catch (err) {
        setError('Failed to load countries.');
      }
    };
    loadCountries();
  }, []);

  return [countries, error];
}