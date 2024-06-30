import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/App.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>
            <Link to="/dashboard"><i className="icon">🏠</i> <span>Dashboard</span></Link>
            <Link to="/users"><i className="icon">👥</i> <span>Users</span></Link>
            <Link to="/movies"><i className="icon">🎬</i> <span>Movies</span></Link>
            <Link to="/theatres"><i className="icon">🎭</i> <span>Theatres</span></Link>
            <Link to="/bookings"><i className="icon">📅</i> <span>Bookings</span></Link>
        </div>
    );
};

export default Sidebar;
