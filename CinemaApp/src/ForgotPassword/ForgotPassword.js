// src/ForgotPasswordPage.js
import React, {useEffect, useState} from 'react';
import './ForgotPassword.css';
import Header from "../Header/Header";
import {useNavigate} from "react-router-dom";
import {ForgotPasswordApiCall} from "./ForgotNetworkCall";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [showDisclaimer, setShowDisclaimer] = useState(false)
    const [remainingTimeToRedirect, setRemainingTimeToRedirect] = useState(7)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            email: email
        }
        const response = await ForgotPasswordApiCall(loginData);

        if (response) {
            setShowDisclaimer(true)
        } else {
            alert('Error while resetting password')
        }
    };

    useEffect(() => {
        if (showDisclaimer) {
            const interval = setInterval(() => {
                let remTime = remainingTimeToRedirect;
                remTime -= 1;

                setRemainingTimeToRedirect(remTime)
                if (remTime <= 0) {
                    navigate('/login')
                }

            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }

    }, [showDisclaimer, remainingTimeToRedirect]);

    return (
        <div>
            <Header/>
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {showDisclaimer &&
                        <div style={{paddingBottom: 10}}>{`Disclaimer: New credentials have been sent to your registered
                            email. You will be redirected to the login page shortly (${remainingTimeToRedirect})`}.</div>}
                    <button type="submit" disabled={showDisclaimer}>Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
