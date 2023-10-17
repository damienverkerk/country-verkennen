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
