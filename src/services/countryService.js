import axios from 'axios';

export const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    if (response.status !== 200) {
      throw new Error('Failed to fetch countries');
    }
    return response.data;
  } catch (error) {
    console.error('Er is een fout opgetreden tijdens het ophalen van de landen:', error);
    throw error;
  }
};


export const fetchCountryByCode = async (countryCode) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch country by code');
    }
    return response.data[0]; 
  } catch (error) {
    console.error('Er is een fout opgetreden tijdens het ophalen van het land:', error);
    throw error;
  }
};


export const getCapitalCoordinates = async (capital, countryCode) => {
  const geoapifyApiKey = 'c55e7ee0dae54a60876749704dd417ac'; 
  const url = `https://api.geoapify.com/v1/geocode/search?text=${capital},${countryCode}&apiKey=${geoapifyApiKey}`;
  
  try {
    const response = await axios.get(url);
    if (response.status !== 200 || !response.data.features || response.data.features.length === 0) {
      throw new Error('Failed to fetch coordinates or no results found');
    }
    const { coordinates } = response.data.features[0].geometry;
    return { lat: coordinates[1], lng: coordinates[0] }; 
  } catch (error) {
    console.error('Er is een fout opgetreden tijdens het ophalen van de coördinaten:', error);
    throw error;
  }
};
