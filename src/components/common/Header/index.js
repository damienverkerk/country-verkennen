import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/header.css';
import LoginLogoutButton from '../../features/LoginLogout';

function Header(){
    return(
        <header className='header'>
            <div className='logo'><Link to="/">ReisApp</Link></div>
            <nav className='nav'>
                <Link to="/">Home</Link>
                <Link to="/filter-countries">FilterCountries</Link>
                <Link to="/select-countries">Select Countries</Link>
                <LoginLogoutButton />
            </nav>
        </header>
    );
}
export default Header;