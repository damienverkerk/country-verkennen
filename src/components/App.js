import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { FavoriteCountriesProvider } from '../contexts/FavoriteCountriesContext'; 
import Header from './common/Header';
import Footer from './common/Footer';
import Login from './features/Login';
import Register from './features/Register';
import '../styles/app.css';
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import Dashboard from './features/Dashboard';



function ProtectedRoute({children}) {
    const { currentUser } = useAuth();

    if ( currentUser ) return children;
    return <Navigate to="/login" />;
}

function App(){
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
                                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
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
