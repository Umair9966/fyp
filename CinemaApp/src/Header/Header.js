import React from 'react';

import './Header.css';
import {useNavigate} from "react-router-dom";
import {clearUserInfo, getUserRewardPoints, isUserLoggedIn} from "../SessionStorage/SessionStorage";

const Header = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        if (isUserLoggedIn()) {
            clearUserInfo()
        } else {
            navigate('/login')
        }
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1></h1>
                <h1>CineTech</h1>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{color: 'black', fontsize: 20, marginRight: 20, fontWeight: 'bold'}}>Reward
                        Points: {getUserRewardPoints()}</div>
                    <div onClick={handleLoginClick}
                         className="login-button">{isUserLoggedIn() ? 'Logout' : 'Login'}</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
