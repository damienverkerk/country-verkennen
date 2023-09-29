import React from 'react';
import '../styles/app.css';
import Header from './Header';
import Footer from './Footer';

function App() {
    return (
        <div className='app'>
            <Header />
            <main>
                <h2>Welkom bij Mijn Reisapp!</h2>
                {/* Hier komen andere componenten en inhoud */}
            </main>
            <Footer />
        </div>
    );
}

export default App;