import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Header from './common/Header';
import Footer from './common/Footer';
import Login from './features/Login';
import Register from './features/Register';
import CountryList from './features/CountryList';
import CountryDetail from './features/CountryDetail';
import CountrySelector from './features/CountrySelector';
import '../styles/app.css';

function ProtectedRoute({children}) {
    const { currentUser } = useAuth();

    if ( currentUser ) return children;
    return <Navigate to="/login" />;
}

function App(){
    return (
        <Router>
        <AuthProvider>
            <div className='app'>
                <Header />
                <main>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/countries" element={<CountryList />} />
                        <Route path="/countries/:cca3" element={<CountryDetail />} />
                        <Route path="/select-countries" element={<ProtectedRoute><CountrySelector /></ProtectedRoute>} />
                        <Route path="/" element={<div>Home</div>} />
                    </Routes>
                </main>
                <Footer />
            </div>
            </AuthProvider>
        </Router>
    );
}
export default App;