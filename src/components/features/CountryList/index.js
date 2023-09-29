import React, {useState, useEffect} from 'react';
 import '../../../styles/countryList.css';

 function CountryList() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Fetch countries from API here
    }, [])

    return (
        <div className='country-list'>
            <h2>Countries</h2>
            <ul>
                {countries.map(country => (
                    <li key={country.code}>{country.name}</li>
                ))}
            </ul>
        </div>
    );
 }

 export default CountryList;