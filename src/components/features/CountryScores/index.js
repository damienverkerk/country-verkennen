import React, { useEffect, useState } from 'react';
import useCountries from '../../../hooks/useCountries';

const CountryScores = ({ selectedCountries, preferences }) => {
    const [allCountries] = useCountries();
    const [topCountries, setTopCountries] = useState([]);

    useEffect(() => {
        // Een eenvoudige functie om de 'score' van een land te berekenen op basis van de voorkeuren
        const calculateScore = (country) => {
            let score = 0;

            if (preferences.languages.length && preferences.languages.some(lang => country.languages.includes(lang))) {
                score++;
            }
            
            if (preferences.currency && country.currencies.includes(preferences.currency)) {
                score++;
            }

            if (country.population >= preferences.populationRange[0] && country.population <= preferences.populationRange[1]) {
                score++;
            }

            return score;
        };

        // Bereken de scores voor de geselecteerde landen
        const scoredCountries = selectedCountries.map(countryCode => {
            const country = allCountries.find(c => c.cca3 === countryCode);
            return {
                ...country,
                score: calculateScore(country)
            };
        });

        // Sorteer de landen op score en neem de top 5
        const sortedCountries = scoredCountries.sort((a, b) => b.score - a.score).slice(0, 5);

        setTopCountries(sortedCountries);
    }, [selectedCountries, preferences, allCountries]);

    return (
        <div>
            <h2>Top 5 Aanbevolen Landen</h2>
            <ul>
                {topCountries.map(country => (
                    <li key={country.cca3}>
                        {country.name.common} (Score: {country.score})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryScores;
