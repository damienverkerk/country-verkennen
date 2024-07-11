import axios from 'axios';

const API_KEY = '9Yb8ThdwV56AZAFKTc5k6CUufesa4EpE';
const API_SECRET = 'yHlJU4ASiM5rcvNt';

let accessToken = null;
let tokenExpiry = null;

const getAccessToken = async () => {
  if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
    return accessToken;
  }
  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
      `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    accessToken = response.data.access_token;
    tokenExpiry = new Date(new Date().getTime() + response.data.expires_in * 1000);
    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

const axiosRetry = async (axiosInstance, options, retries = 3, backoff = 3000) => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await axiosInstance(options);
    } catch (error) {
      if (error.response && error.response.status === 429 && attempt < retries - 1) {
        console.warn(`Retrying request in ${backoff}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2; 
      } else {
        throw error;
      }
    }
  }
};

const fetchHotelOffers = async (hotelIds, token) => {
  try {
    const response = await axiosRetry(axios, {
      method: 'get',
      url: 'https://test.api.amadeus.com/v3/shopping/hotel-offers',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        hotelIds: hotelIds.join(','),
      }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching hotel offers:', error);
    return [];
  }
};

export const fetchBookingOptions = async (lat, lng) => {
  try {
    const token = await getAccessToken();
    const hotelsResponse = await axiosRetry(axios, {
      method: 'get',
      url: 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        latitude: lat,
        longitude: lng,
        radius: 5,
        radiusUnit: 'KM',
        hotelSource: 'ALL'
      }
    });

    const hotels = hotelsResponse.data.data || [];
    const batchSize = 10;
    const hotelBatches = [];
    for (let i = 0; i < hotels.length; i += batchSize) {
      hotelBatches.push(hotels.slice(i, i + batchSize));
    }

    const allOffers = [];
    for (const batch of hotelBatches) {
      const batchOffers = await fetchHotelOffers(batch.map(hotel => hotel.hotelId), token);
      allOffers.push(...batchOffers);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const hotelsWithPrices = hotels.map(hotel => {
      const hotelOffers = allOffers.find(offer => offer.hotel.hotelId === hotel.hotelId);
      if (hotelOffers && hotelOffers.offers && hotelOffers.offers.length > 0) {
        const cheapestOffer = hotelOffers.offers.reduce((min, offer) =>
          parseFloat(offer.price.total) < parseFloat(min.price.total) ? offer : min, hotelOffers.offers[0]);
        return { ...hotel, cheapestOffer };
      }
      return null;
    }).filter(hotel => hotel !== null);

    return hotelsWithPrices;
  } catch (error) {
    console.error('Error fetching booking options:', error);
    throw error;
  }
};