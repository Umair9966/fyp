import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({
    title: '',
    description: '',
    release_date: '',
    genre: '',
    thumbnail: '',
    background_image: '',
    nowShowing: 'false',
    theater_id: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchMovies();
    fetchTheaters();
  }, []);

  const fetchMovies = () => {
    setLoading(true);
    axios.get('/movies')
      .then(response => {
        setMovies(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch movies');
        setLoading(false);
      });
  };

  const fetchTheaters = () => {
    setLoading(true);
    axios.get('/theatres')
      .then(response => {
        setTheaters(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch theaters');
        setLoading(false);
      });
  };

  const handleEdit = (movie) => {
    setCurrentMovie(movie);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCopy = (movie) => {
    const newMovie = { ...movie, id: undefined };
    setCurrentMovie(newMovie);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`/movies/${id}`)
      .then(() => {
        setSuccess('Movie deleted successfully');
        fetchMovies();
      })
      .catch(() => {
        setError('Failed to delete movie');
        setLoading(false);
      });
  };

  const handleCreate = () => {
    setCurrentMovie({
      title: '',
      description: '',
      release_date: '',
      genre: '',
      thumbnail: '',
      background_image: '',
      nowShowing: 'false',
      theater_id: ''
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, release_date, genre, thumbnail, background_image, nowShowing, theater_id } = currentMovie;
    setLoading(true);

    const request = isEditMode
      ? axios.post(`/movies/${currentMovie.id}`, { title, description, release_date, genre, thumbnail, background_image, nowShowing, theater_id })
      : axios.post('/movies', { title, description, release_date, genre, thumbnail, background_image, nowShowing, theater_id });

    request.then(() => {
      setSuccess(`Movie ${isEditMode ? 'updated' : 'created'} successfully`);
      fetchMovies();
      handleCloseModal();
    })
    .catch(() => {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} movie`);
      setLoading(false);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentMovie(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container mt-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <button className="btn btn-primary mb-3" onClick={handleCreate}>Create Movie</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Release Date</th>
            <th>Genre</th>
            <th>Thumbnail</th>
            <th>Background Image</th>
            <th>Now Showing</th>
            <th>Theater</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.description}</td>
              <td>{movie.release_date}</td>
              <td>{movie.genre}</td>
              <td><img src={movie.thumbnail} alt="Thumbnail" style={{ width: '100px' }} /></td>
              <td><img src={movie.background_image} alt="Background" style={{ width: '100px' }} /></td>
              <td>{movie.nowShowing ? 'Yes' : 'No'}</td>
              <td>{theaters.find(theater => theater.id === movie.theater_id)?.name || ''}</td>
              <td>
                <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(movie)}>Edit</button>
                {/* <button className="btn btn-success btn-sm mr-2" onClick={() => handleCopy(movie)}>Copy</button> */}
                {/* <button className="btn btn-danger btn-sm" onClick={() => handleDelete(movie.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? 'open' : ''}`} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit Movie' : 'Create Movie'}</h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close" style={{ marginLeft: 'auto' }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={currentMovie.title} onChange={handleChange} placeholder="Title" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" value={currentMovie.description} onChange={handleChange} placeholder="Description" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="release_date">Release Date</label>
                    <input type="date" className="form-control" id="release_date" name="release_date" value={currentMovie.release_date} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" className="form-control" id="genre" name="genre" value={currentMovie.genre} onChange={handleChange} placeholder="Genre" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail URL</label>
                    <input type="text" className="form-control" id="thumbnail" name="thumbnail" value={currentMovie.thumbnail} onChange={handleChange} placeholder="Thumbnail URL" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="background_image">Background Image URL</label>
                    <input type="text" className="form-control" id="background_image" name="background_image" value={currentMovie.background_image} onChange={handleChange} placeholder="Background Image URL" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nowShowing">Now Showing</label>
                    <select className="form-control" id="nowShowing" name="nowShowing" value={currentMovie.nowShowing} onChange={handleChange} required>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="theater_id">Theater</label>
                    <select className="form-control" id="theater_id" name="theater_id" value={currentMovie.theater_id} onChange={handleChange} required>
                      <option value="">Select Theater</option>
                      {theaters.map(theater => (
                        <option key={theater.id} value={theater.id}>{theater.name}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
