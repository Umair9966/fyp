import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';

const MovieForm = ({ movie, setMovie }) => {
    const [formData, setFormData] = useState(movie || { title: '', description: '', release_date: '', genre: '', thumbnail: '', background_image: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (movie) {
            axios.put(`/movies/${movie.id}`, formData)
                .then(response => setMovie(response.data))
                .catch(error => console.error(error));
        } else {
            axios.post('/movies', formData)
                .then(response => setMovie(response.data))
                .catch(error => console.error(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} required />
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
            <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="Thumbnail URL" />
            <input type="text" name="background_image" value={formData.background_image} onChange={handleChange} placeholder="Background Image URL" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default MovieForm;
