import axios from 'axios';


const API_KEY = '9Yb8ThdwV56AZAFKTc5k6CUufesa4EpE';
const API_SECRET = 'yHlJU4ASiM5rcvNt';

let accessToken = null;
let tokenExpiry = null;
const MAX_HOTEL_IDS = 25; 
const DESIRED_RESULTS = 5; 


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
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        hotelIds: hotelIds.join(','), 
        view: 'LIGHT', 
      }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching hotel offers:', error);
    return [];
  }
};


const batchHotelIds = (hotelIds, batchSize) => {
  const batches = [];
  for (let i = 0; i < hotelIds.length; i += batchSize) {
    batches.push(hotelIds.slice(i, i + batchSize));
  }
  return batches;
};

export const fetchBookingOptions = async (lat, lng) => {
  try {
    const token = await getAccessToken();
    const hotelsResponse = await axiosRetry(axios, {
      method: 'get',
      url: 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        latitude: lat,
        longitude: lng,
        radius: 5,
        radiusUnit: 'KM',
        hotelSource: 'ALL'
      }
    });

    const hotelIds = hotelsResponse.data.data.map(hotel => hotel.hotelId) || [];

    if (hotelIds.length === 0) {
      console.error('No valid hotel IDs found');
      return [];
    }

    const hotelIdBatches = batchHotelIds(hotelIds, MAX_HOTEL_IDS);
    let allOffers = [];

    for (const batch of hotelIdBatches) {
      const batchOffers = await fetchHotelOffers(batch, token);
      allOffers = allOffers.concat(batchOffers);
      if (allOffers.length >= DESIRED_RESULTS) {
        allOffers = allOffers.slice(0, DESIRED_RESULTS); 
        break;
      }
    }

    const hotelsWithPrices = allOffers.map(offer => ({
      hotelId: offer.hotel.hotelId,
      name: offer.hotel.name,
      latitude: offer.hotel.latitude,
      longitude: offer.hotel.longitude,
      cheapestOffer: offer.offers[0], 
    }));

    return hotelsWithPrices;
  } catch (error) {
    console.error('Error fetching booking options:', error);
    throw error;
  }
};
