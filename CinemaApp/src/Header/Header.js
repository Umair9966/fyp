// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>CineTech</h1>
            {/*<nav>*/}
            {/*    <ul className="nav-links">*/}
            {/*        <li><Link to="/">Home</Link></li>*/}
            {/*        <li><Link to="/dashboard">Dashboard</Link></li>*/}
            {/*        <li><Link to="/login">Login</Link></li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}
        </header>
    );
};

export default Header;
