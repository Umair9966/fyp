import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import UsersPage from './pages/UsersPage';
import TheatresPage from './pages/TheatresPage';
import BookingsPage from './pages/BookingsPage';
import LoginPage from './components/Auth/Login';
import Sidebar from './components/Sidebar'; // Import Sidebar component
import Dashboard from './pages/Dashboard'; // Import Dashboard component
import '../src/App.css';

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
      <Router>
          <div className={`app ${isSidebarCollapsed ? 'collapsed' : ''}`}>
              <Sidebar />
              <div className="main-content">
                  <div className={`header ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                      <h1>CineTech</h1>
                      <button className="toggle-btn" onClick={toggleSidebar}>
                          {isSidebarCollapsed ? 'Expand' : 'Umair Ahmed'}
                      </button>
                  </div>
                  <div className="container">
                      <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/movies" element={<MoviesPage />} />
                          <Route path="/users" element={<UsersPage />} />
                          <Route path="/theatres" element={<TheatresPage />} />
                          <Route path="/bookings" element={<BookingsPage />} />
                      </Routes>
                  </div>
              </div>
          </div>
      </Router>
  );
};

export default App;