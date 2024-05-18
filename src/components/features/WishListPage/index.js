import React from 'react';
import CountrySelection from '../CountrySelection';
import { useNavigate } from 'react-router-dom';

const WishListPage = ({ wishListCountries, onCountrySelect }) => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/filters');
    };

    const handleBack = () => {
        navigate('/visited');
    };

    return (
        <section className="page-container">
            <header>
                <h1>Welke landen staan op je wenslijst?</h1>
            </header>
            <main>
                <CountrySelection 
                    onCountrySelect={onCountrySelect} 
                    selectedCountries={wishListCountries}
                    title="Wenslijst landen"
                />
            </main>
            <footer>
                <button onClick={handleBack}>Terug</button>
                <button onClick={handleNext}>Volgende</button>
            </footer>
        </section>
    );
}

export default WishListPage;
