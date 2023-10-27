import React from 'react';
import useCountries from '../../../hooks/useCountries';
import { useFavoriteCountries } from '../../../contexts/FavoriteCountriesContext';

const FavoriteCountriesList = () => {
    const [countries, error] = useCountries(); 
    const { favorites, setFavorites } = useFavoriteCountries();

    const toggleFavorite = (countryCode) => {
        if (favorites.includes(countryCode)) {
            setFavorites(fav => fav.filter(code => code !== countryCode));
        } else {
            if (favorites.length < 10) {
                setFavorites(fav => [...fav, countryCode]);
            } else {
                alert("Je hebt het maximum aantal van 10 landen bereikt!");
            }
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return(
        <div>
            {countries.map(country => (
                <div key={country.cca3}>
                {country.name.common}
                <button onClick={() => toggleFavorite(country.cca3)}>
                    {favorites.includes(country.cca3) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                </div>
            ))}
        </div>
    );
};

export default FavoriteCountriesList;
