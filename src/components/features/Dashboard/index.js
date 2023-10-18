import React from 'react';
import '../../../styles/dashboard.css';
import PreferencesForm from '../PreferencesForm';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1>Welcome to your Dashboard</h1>
            <p>Here's an overview of your preferences and activities.</p>
            <PreferencesForm />
        </div>
    );
}

export default Dashboard;
