import React, { useEffect, useState } from 'react';
import { fetchCountries } from '../../../services/countryService';
import { useFavoriteCountries } from '../../../contexts/FavoriteCountriesContext';

const FavoriteCountriesList = () => {
    const [countries, setCountries] = useState([]);
    const { favorites, setFavorites } = useFavoriteCountries();

    useEffect(() => {
        const getCountries = async () => {
            const data = await fetchCountries();
            setCountries(data);
        };
        getCountries();
    }, []);

    const toggleFavorite = (countryCode) => {
        if (favorites.includes(countryCode)) {
            setFavorites(fav => fav.filter(code => code !== countryCode));
        } else {
            if (favorites.length < 10) {
                setFavorites(fav => [...fav, countryCode]);
            } else {
                // Feedback voor de limiet van 10 landen
                alert("Je hebt het maximum aantal van 10 landen bereikt!");
            }
        }
    };
    

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

export default FavoriteCountriesList