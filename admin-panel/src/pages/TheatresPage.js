import React, { useState } from 'react';
import TheatresList from '../components/Theatres/TheatresList';
import TheatreForm from '../components/Theatres/TheatreForm';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const TheatresPage = () => {
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Theatres Management</h2>
      <div className="card">
        <div className="card-body">
          <TheatresList />
        </div>
      </div>
      {/* <TheatreForm theatre={selectedTheatre} setTheatre={setSelectedTheatre} /> */}
    </div>
  );
};

export default TheatresPage;
