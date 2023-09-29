import React from 'react';
import '../styles/country.css';

function Country({name, capital, population}){
    return (
        <div className='country-container'>
            <h3>{name}</h3>
            <p>Hoofdstad: {capital}</p>
            <p>Bevolking: {population}</p>
        </div>
    );
}

export default Country; 
