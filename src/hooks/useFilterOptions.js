import { useState, useEffect, useMemo } from 'react';
import useCountries from './useCountries';

const useFilterOptions = () => {
  const [countries] = useCountries();
  const [languages, setLanguages] = useState([]);
  const [regions, setRegions] = useState([]);
  const [subregions, setSubregions] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [populationRange] = useState([0, 1000000000]);
  const [areaRange] = useState([0, 17098242]);

  useEffect(() => {
    if (countries && countries.length > 0) {
      const uniqueLanguages = [...new Set(countries.flatMap(country => country.languages ? Object.values(country.languages) : []))];
      const uniqueRegions = [...new Set(countries.map(country => country.region).filter(Boolean))];
      const uniqueSubregions = [...new Set(countries.map(country => country.subregion).filter(Boolean))];
      const uniqueCurrencies = [...new Set(countries.flatMap(country => country.currencies ? Object.values(country.currencies).map(cur => cur.name) : []))];

      setLanguages(uniqueLanguages);
      setRegions(uniqueRegions);
      setSubregions(uniqueSubregions);
      setCurrencies(uniqueCurrencies);
    }
  }, [countries]);

  const memoizedOptions = useMemo(() => ({
    languages,
    regions,
    subregions,
    currencies,
    populationRange,
    areaRange
  }), [languages, regions, subregions, currencies, populationRange, areaRange]);

  return memoizedOptions;
};

export default useFilterOptions;
