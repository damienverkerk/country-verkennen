import { useState, useEffect } from 'react';
import { fetchCountries } from '../services/countryService';

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCountries();
        setCountries(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return [countries, error];
};

export default useCountries;
