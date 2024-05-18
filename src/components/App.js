import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { FavoriteCountriesProvider } from '../contexts/FavoriteCountriesContext'; 
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import Header from './common/Header';
import Footer from './common/Footer';
import Login from './features/Login';
import Register from './features/Register';
import Dashboard from './features/Dashboard';
import VisitedCountriesPage from './features/VisitedCountriesPage';
import WishListPage from './features/WishListPage';
import FiltersPage from './features/FiltersPage';
import ResultsPage from './features/ResultsPage';
import CountryDetail from './features/CountryDetail';
import '../styles/app.css';

function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
}

function App() {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [wishListCountries, setWishListCountries] = useState([]);
    const [filters, setFilters] = useState({
        region: '',
        subregion: '',
        language: '',
        currency: '',
        borders: '',
        population: 0,
        area: 0,
        landlocked: false
    });

    const handleCountrySelect = (selectedCountries) => setSelectedCountries(selectedCountries);
    const handleWishListSelect = (selectedCountries) => setWishListCountries(selectedCountries);
    const handleFilterChange = (filterKey, value) => setFilters(prevFilters => ({
        ...prevFilters,
        [filterKey]: value
    }));

    return (
        <Router>
            <AuthProvider>
                <UserPreferencesProvider>
                    <FavoriteCountriesProvider>
                        <div className='app'>
                            <Header />
                            <main>
                                <Routes>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/" element={
                                        <ProtectedRoute>
                                            <Dashboard 
                                                selectedCountries={selectedCountries}
                                                wishListCountries={wishListCountries}
                                                onCountrySelect={handleCountrySelect}
                                                onWishListSelect={handleWishListSelect}
                                                filters={filters}
                                                onFilterChange={handleFilterChange}
                                            />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/visited" element={
                                        <ProtectedRoute>
                                            <VisitedCountriesPage
                                                selectedCountries={selectedCountries}
                                                onCountrySelect={handleCountrySelect}
                                            />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/wishlist" element={
                                        <ProtectedRoute>
                                            <WishListPage
                                                wishListCountries={wishListCountries}
                                                onCountrySelect={handleWishListSelect}
                                            />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/filters" element={
                                        <ProtectedRoute>
                                            <FiltersPage
                                                filters={filters}
                                                onFilterChange={handleFilterChange}
                                            />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/results" element={
                                        <ProtectedRoute>
                                            <ResultsPage
                                                selectedCountries={selectedCountries}
                                                wishListCountries={wishListCountries}
                                                preferences={filters}
                                            />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/country/:countryCode" element={
                                        <ProtectedRoute>
                                            <CountryDetail />
                                        </ProtectedRoute>
                                    } />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </FavoriteCountriesProvider>
                </UserPreferencesProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
