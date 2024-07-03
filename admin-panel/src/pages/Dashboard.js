import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [moviesCount, setMoviesCount] = useState(0);
  const [theatersCount, setTheatersCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [moviesRes, theatersRes, bookingsRes, usersRes] = await Promise.all([
          axios.get('/movies'),
          axios.get('/theatres'),
          axios.get('/bookings'),
          axios.get('/users')
        ]);

        setMoviesCount(moviesRes.data.length);
        setTheatersCount(theatersRes.data.length);
        setBookingsCount(bookingsRes.data.length);
        setUsersCount(usersRes.data.length);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <div className="container mt-4"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="container mt-4"><p className="text-danger">{error}</p></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <Link to="/movies" className="card text-center">
            <div className="card-body">
              <div className="icon">🎬</div>
              <div className="number">{moviesCount}</div>
              <div className="label">Movies</div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/theatres" className="card text-center">
            <div className="card-body">
              <div className="icon">🎭</div>
              <div className="number">{theatersCount}</div>
              <div className="label">Theatres</div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/bookings" className="card text-center">
            <div className="card-body">
              <div className="icon">📅</div>
              <div className="number">{bookingsCount}</div>
              <div className="label">Bookings</div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/users" className="card text-center">
            <div className="card-body">
              <div className="icon">👥</div>
              <div className="number">{usersCount}</div>
              <div className="label">Users</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
