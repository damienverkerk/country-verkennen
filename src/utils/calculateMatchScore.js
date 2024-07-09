export const calculateMatchScore = (country, filters, selectedCountries, wishListCountries) => {
  if (!filters || Object.keys(filters).length === 0) {
      return 0;
  }

  let score = 0;
  const initialWeights = {
      language: 20,
      region: 15,
      subregion: 10,
      currency: 10,
      population: 10,
      area: 10,
      landlocked: 5,
      adjacent: 10,
      wishlist: 10
  };

  const activeWeights = {};
  let activeWeightSum = 0;
  Object.keys(initialWeights).forEach(key => {
      if (filters[key] || key === 'adjacent' || key === 'wishlist') {
          activeWeights[key] = initialWeights[key];
          activeWeightSum += initialWeights[key];
      }
  });

  const normalizeWeight = weight => (weight / activeWeightSum) * 100;

  if (filters.language && country.languages && Object.values(country.languages).includes(filters.language)) {
      score += normalizeWeight(activeWeights.language);
  }

  if (filters.region && country.region === filters.region) {
      score += normalizeWeight(activeWeights.region);
  }

  if (filters.subregion && country.subregion === filters.subregion) {
      score += normalizeWeight(activeWeights.subregion);
  }

  if (filters.currency && country.currencies && Object.values(country.currencies).some(cur => cur.name === filters.currency)) {
      score += normalizeWeight(activeWeights.currency);
  }

  if (filters.population && country.population <= filters.population) {
      score += normalizeWeight(activeWeights.population);
  }

  if (filters.area && country.area <= filters.area) {
      score += normalizeWeight(activeWeights.area);
  }

  if (filters.landlocked !== undefined && country.landlocked === filters.landlocked) {
      score += normalizeWeight(activeWeights.landlocked);
  }

  if (selectedCountries.some(sc => country.borders && country.borders.includes(sc.cca3))) {
      score += normalizeWeight(activeWeights.adjacent);
  }

  if (wishListCountries.some(wc => wc.cca3 === country.cca3)) {
      score += normalizeWeight(activeWeights.wishlist);
  }

  return score;
};
