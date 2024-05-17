import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import LoginLogoutButton from '../../features/LoginLogout';
import '../../../styles/header.css';

function Header() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>ReisApp</div>
            {currentUser && (
                <nav className="nav">
                    <ul>
                        <li><Link to="/visited">Bezochte Landen</Link></li>
                        <li><Link to="/wishlist">Wenslijst Landen</Link></li>
                        <li><Link to="/filters">Filters</Link></li>
                        <li><Link to="/results">Resultaten</Link></li>
                    </ul>
                </nav>
            )}
            <LoginLogoutButton />
        </header>
    );
}

export default Header;
