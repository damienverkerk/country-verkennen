import React from 'react';

function ScoreCalculator({ selectedCountries }) {
  const calculateScore = (countryCode) => {
    return Math.floor(Math.random() * 100);
  };

  const rankedCountries = [...selectedCountries]
    .map(code => ({ code, score: calculateScore(code) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div>
      <h2>Top 5 Landen</h2>
      <ul>
        {rankedCountries.map(country => (
          <li key={country.code}>
            {country.code} - Score: {country.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScoreCalculator;
