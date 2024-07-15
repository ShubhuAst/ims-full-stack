import React from 'react';
import NavBar from './Navbar';
import IncidentList from './incident/IncidentList';

const HomePage = () => {
    return (
        <div>
            <NavBar/>
            <IncidentList/>
        </div>
    );
};

export default HomePage;
