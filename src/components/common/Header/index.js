import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/header.css';

function Header(){
    return(
        <header className='header'>
            <div className='logo'>ReisApp</div>
            <nav className='nav'>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/countries">Countries</Link>
            </nav>
        </header>
    );
}
export default Header;