import React from "react";
import '../styles/countrylist.css';

function CountryList(){
    return (
        <ul className="country-list">
            <li className="country-item">Nederland</li>
            <li className="country-item">België</li>
            <li className="country-item">Duitsland</li>
        </ul>
    );
}
export default CountryList;