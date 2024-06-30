import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <Link to="/movies" className="card text-center">
            <div className="card-body">
              <div className="icon">🎬</div>
              <div className="number">10</div>
              <div className="label">Movies</div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/theatres" className="card text-center">
            <div className="card-body">
              <div className="icon">🎭</div>
              <div className="number">5</div>
              <div className="label">Theatres</div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/bookings" className="card text-center">
            <div className="card-body">
              <div className="icon">📅</div>
              <div className="number">25</div>
              <div className="label">Bookings</div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/users" className="card text-center">
            <div className="card-body">
              <div className="icon">👥</div>
              <div className="number">50</div>
              <div className="label">Users</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
