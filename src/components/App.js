import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { FavoriteCountriesProvider } from '../contexts/FavoriteCountriesContext'; 
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import { AppStateProvider } from '../contexts/AppStateContext';
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
import useCountries from '../hooks/useCountries';
import { calculateMatchScore } from '../utils/calculateMatchScore';
import '../styles/app.css';

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
                                <main>
                                    <Routes>
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
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
                                                <CountryDetail allCountries={allCountries} />
                                            </ProtectedRoute>
                                        } />
                                    </Routes>
                                </main>
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
