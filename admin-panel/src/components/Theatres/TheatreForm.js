import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';

const TheatreForm = ({ theatre, setTheatre }) => {
    const [formData, setFormData] = useState(theatre || { name: '', address: '', capacity: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (theatre) {
            axios.put(`/theatres/${theatre.id}`, formData)
                .then(response => setTheatre(response.data))
                .catch(error => console.error(error));
        } else {
            axios.post('/theatres', formData)
                .then(response => setTheatre(response.data))
                .catch(error => console.error(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default TheatreForm;
