import React from 'react';

function ScoreCalculator({ selectedCountries }) {
  const rankedCountries = [...selectedCountries]
    .map(country => ({
      code: country.cca3,
      name: country.name.common,
      score: Math.floor(Math.random() * 100)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div>
      <h2>Top 5 Landen</h2>
      <ul>
        {rankedCountries.map(country => (
          <li key={country.code}>
            {country.name} - Score: {country.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScoreCalculator;
