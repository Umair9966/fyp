import React, { useState } from 'react';
import MoviesList from '../components/Movies/MoviesList';
import MovieForm from '../components/Movies/MovieForm';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const MoviesPage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Movies Management</h2>
      <div className="card">
        <div className="card-body">
          <MoviesList />
        </div>
      </div>
      {/* <MovieForm movie={selectedMovie} setMovie={setSelectedMovie} /> */}
    </div>
  );
};

export default MoviesPage;
