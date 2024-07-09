const UNSPLASH_ACCESS_KEY = 'YtgsJXPQIEEo1v9m9KH68n5YeiX1OPB49zai90ludp4';

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 400;

export const fetchImagesByCountry = async (countryName) => {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${countryName}&client_id=${UNSPLASH_ACCESS_KEY}`);
  const data = await response.json();
  return data.results.map(image => `${image.urls.raw}&w=${IMAGE_WIDTH}&h=${IMAGE_HEIGHT}&fit=crop`);
};
