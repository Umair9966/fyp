// src/SignupPage.js
import React, {useState} from 'react';
import './Signup.css';
import Header from "../Header/Header";
import {signupUser} from "./SignupNetworkCall";
import {useNavigate} from "react-router-dom";
import {saveUserInfo} from "../SessionStorage/SessionStorage";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('Name is required')
            return
        }

        if (password !== confirmPassword) {
            alert('Password mismatch')
            return
        }
        const dataForSignup = {
            email: email,
            username: name,
            password: password
        }
        const response = await signupUser(dataForSignup)

        if (response) {
            saveUserInfo(response)
            navigate('/dashboard')
        }
        else {
            alert("Error signing up")
        }
    };

    return (
        <div>
            <Header/>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
