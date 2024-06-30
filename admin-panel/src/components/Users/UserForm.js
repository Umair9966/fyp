import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';

const UserForm = ({ user, setUser }) => {
    const [formData, setFormData] = useState(user || { username: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            axios.put(`/users/${user.id}`, formData)
                .then(response => setUser(response.data))
                .catch(error => console.error(error));
        } else {
            axios.post('/users', formData)
                .then(response => setUser(response.data))
                .catch(error => console.error(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
