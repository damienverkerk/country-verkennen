import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountrySelection from '../CountrySelection';
import '../../../styles/dashboard.css';

const Dashboard = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [wishListCountries, setWishListCountries] = useState([]);

    useEffect(() => {
        // Hier kunnen we de geselecteerde en wenslijst landen ophalen als dat nodig is
    }, []);

    return (
        <div className="dashboard-container">
            <section className="dashboard-section">
                <h2>Welkom bij ReisApp</h2>
                <p>Gebruik deze dashboard om je reisvoorkeuren te beheren en nieuwe bestemmingen te ontdekken.</p>
            </section>

            <section className="dashboard-section">
                <h2>Overzicht</h2>
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>Bezochte Landen</h3>
                        {selectedCountries.length > 0 ? (
                            <ul>
                                {selectedCountries.map(country => (
                                    <li key={country.cca3}>{country.name.common}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Je hebt nog geen landen toegevoegd.</p>
                        )}
                        <Link to="/visited">Bezochte landen beheren</Link>
                    </div>

                    <div className="dashboard-card">
                        <h3>Wenslijst Landen</h3>
                        {wishListCountries.length > 0 ? (
                            <ul>
                                {wishListCountries.map(country => (
                                    <li key={country.cca3}>{country.name.common}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Je hebt nog geen landen toegevoegd aan je wenslijst.</p>
                        )}
                        <Link to="/wishlist">Wenslijst landen beheren</Link>
                    </div>
                </div>
            </section>

            <section className="dashboard-section">
                <h2>Ga verder</h2>
                <ul className="dashboard-links">
                    <li><Link to="/filters">Filters instellen</Link></li>
                    <li><Link to="/results">Resultaten bekijken</Link></li>
                </ul>
            </section>
        </div>
    );
}

export default Dashboard;
