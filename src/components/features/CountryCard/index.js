import React from 'react';
import Card from '../../common/Card';
import '../../../styles/countryCard.css';

function CountryCard({ country, onCountrySelect }) {
    return (
        <Card 
            title={country.name.common}
            onClick={() => onCountrySelect(country.cca3)}
        >
            <img className="country-flag" src={country.flags.png} alt={`${country.name.common} vlag`} />
            <div className="country-details">
                <p>Score: {country.score.toFixed(2)}%</p>
            </div>
        </Card>
    );
}

export default CountryCard;