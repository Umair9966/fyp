import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    axios.get('/bookings')
      .then(response => {
        setBookings(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch bookings');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`/bookings/${id}`)
      .then(() => {
        setSuccess('Booking deleted successfully');
        fetchBookings();
      })
      .catch(() => {
        setError('Failed to delete booking');
        setLoading(false);
      });
  };

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Movie Name</th>
            <th>Tickets</th>
            <th>Seat Details</th>
            <th>Booking Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.customer_name}</td>
              <td>{booking.movie_name}</td>
              <td>{booking.number_of_tickets}</td>
              <td>{booking.seat_details}</td>
              <td>{booking.booking_date}</td>
              <td>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
