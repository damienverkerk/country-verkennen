import React from 'react';
import '../styles/header.css';

function Header() {
    return(
        <header>
            <h1>
                Mijn Reisapp
            </h1>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#countries">Landen</a></li>
                    <li><a href="#login">Inloggen</a></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;