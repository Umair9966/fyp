// src/LoginPage.js
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Login.css';
import Header from "../Header/Header";
import {saveUserInfo} from "../SessionStorage/SessionStorage";
import {loginUser} from "./LoginNetworkCall";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlelogin = async () => {

        const loginData = {
            email: email,
            password: password
        }
        const loginUserResponse = await loginUser(loginData)

        if (loginUserResponse) {
            saveUserInfo(loginUserResponse)
            navigate('/dashboard');
        } else {
            alert('Login failed')
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
        await handlelogin()
    };

    return (
        <div>
            <Header/>
            <div className="login-container">

                <h2>Login</h2>
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
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="links">
                    <Link to="/forgot-password">Forgot Password?</Link>

                </div>
                <div className="links">
                    <Link to="/signup">Sign Up</Link>

                </div>

            </div>
        </div>
    );
};

export default Login;
