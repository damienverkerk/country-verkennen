import React from 'react';
import '../styles/app.css';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import CountryList from './CountryList';
import Country from './Country';
import Score from './Score';

function App() {
    return (
        <div className='app'>
            <Header />
            <main>
                <h2>Welkom bij Mijn Reisapp!</h2>
                <Login />
                <Register />
                <CountryList />
                <Country
                    name="Nederland"
                    capital= "Amsterdam"
                    population= "17 miljoen"
                />
                <Score country="Nederland" score="8.5" />
                <Country
                    name="Belgie"
                    capital="Brussel"
                    population="11 miljoen"
                    />
                <Score country="Belgie" score="7.5" />
                
                {/* Hier komen andere componenten en inhoud */}
            </main>
            <Footer />
        </div>
    );
}

export default App;