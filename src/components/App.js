import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { FavoriteCountriesProvider } from '../contexts/FavoriteCountriesContext'; 
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import { AppStateProvider } from '../contexts/AppStateContext';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import Login from '../pages/LoginPage/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import VisitedCountriesPage from '../pages/VisitedCountriesPage/VisitedCountriesPage';
import WishListPage from '../pages/WishListPage/WishListPage';
import FiltersPage from '../pages/FiltersPage/FiltersPage';
import ResultsPage from '../pages/ResultsPage/ResultsPage';
import CountryDetailPage from '../pages/CountryDetailPage/CountryDetailPage';
import useCountries from '../hooks/useCountries';
import { calculateMatchScore } from '../utils/calculateMatchScore';
import './App.css';
import '../styles/global.css';
import '../styles/variables.css';

function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
}

function App() {
    const [allCountries] = useCountries();

    return (
        <Router>
            <AuthProvider>
                <UserPreferencesProvider>
                    <FavoriteCountriesProvider>
                        <AppStateProvider>
                            <div className='app'>
                                <Header />
                                <div className='content'>
                                    <Routes>
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/" element={
                                            <ProtectedRoute>
                                                <Dashboard 
                                                    allCountries={allCountries}
                                                    calculateMatchScore={calculateMatchScore}
                                                />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/visited-countries" element={
                                            <ProtectedRoute>
                                                <VisitedCountriesPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/wishlist-countries" element={
                                            <ProtectedRoute>
                                                <WishListPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/filters" element={
                                            <ProtectedRoute>
                                                <FiltersPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/results" element={
                                            <ProtectedRoute>
                                                <ResultsPage
                                                    allCountries={allCountries}
                                                    calculateMatchScore={calculateMatchScore}
                                                />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/country/:countryCode" element={
                                            <ProtectedRoute>
                                                <CountryDetailPage allCountries={allCountries} />
                                            </ProtectedRoute>
                                        } />
                                    </Routes>
                                </div>
                                <Footer />
                            </div>
                        </AppStateProvider>
                    </FavoriteCountriesProvider>
                </UserPreferencesProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
