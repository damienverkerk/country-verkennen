import React from 'react';
import CountrySelection from '../countrySelection';
import MultiSelectDropdown from '../MultiSelectDropdown';
import CountryRecommender from '../CountryRecommender';
import '../../../styles/dashboard.css';

const handleCountrySelect = (cca3) => {
    console.log(cca3)
};
const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="country-selection">
                <CountrySelection/>
            </div>
            <div className="country-selection">
             <MultiSelectDropdown onSelect={handleCountrySelect} />
            </div>
            <div className="travel-history">
                {/* Hier komt de interactieve wereldkaart */}
            </div>
            
            <div className="country-scores">
            <CountryRecommender />
            </div>
        </div>
    );
}

export default Dashboard;
