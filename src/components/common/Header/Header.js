import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import LoginLogoutButton from '../../features/Auth/LoginLogout/LoginLogoutButton';
import './Header.css';

function Header() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo" onClick={() => navigate('/')} role="button" tabIndex="0">ReisApp</div>
                {currentUser && (
                    <nav className="nav" aria-label="Main Navigation">
                        <ul>
                            <li>
                                <NavLink to="/visited-countries" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                    Bezochte Landen
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/wishlist-countries" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                    Wenslijst Landen
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/filters" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                    Filters
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/results" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                    Resultaten
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                )}
                <LoginLogoutButton />
            </div>
        </header>
    );
}

export default Header;