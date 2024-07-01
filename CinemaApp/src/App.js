import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Signup from './Signup/Signup';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import './App.css';
import MovieDetail from "./MovieDetail/MovieDetail";
import SeatSelection from "./SeatSelection/SeatSelection";
import AboutUs from "./AboutUs/AboutUs";


function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/movie" element={<MovieDetail />} />
                  <Route path="/seat-selection" element={<SeatSelection/>} />
                  <Route path="/about" element={<AboutUs/>} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
