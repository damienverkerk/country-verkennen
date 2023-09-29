import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Header from './common/Header';
import Footer from './common/Footer';
import Login from './features/Login';
import Register from './features/Register';
import CountryList from './features/CountryList';
import '../styles/app.css';

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