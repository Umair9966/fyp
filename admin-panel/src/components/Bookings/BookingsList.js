import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  const handleEdit = (id) => {
    const newStatus = prompt('Enter new status');
    if (newStatus) {
      setLoading(true);
      axios.put(`/bookings/${id}`, { status: newStatus })
        .then(() => {
          setSuccess('Booking updated successfully');
          fetchBookings();
        })
        .catch(() => {
          setError('Failed to update booking');
          setLoading(false);
        });
    }
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

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const customer_id = event.target.customer_id.value;
    const show_id = event.target.show_id.value;
    const number_of_tickets = event.target.number_of_tickets.value;
    const Booking_date = event.target.Booking_date.value;
    const total_amount = event.target.total_amount.value;

    if (customer_id && show_id && number_of_tickets && Booking_date && total_amount) {
      setLoading(true);
      axios.post('/bookings', { customer_id, show_id, number_of_tickets, Booking_date, total_amount })
        .then(() => {
          setSuccess('Booking created successfully');
          fetchBookings();
          setIsModalOpen(false);
        })
        .catch(() => {
          setError('Failed to create booking');
          setLoading(false);
        });
    }
  };

  return (
    <div className="container">
      <button className="btn btn-primary mb-3" onClick={handleCreate}>Create Booking</button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Show ID</th>
            <th>Tickets</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.customer_id}</td>
              <td>{booking.show_id}</td>
              <td>{booking.number_of_tickets}</td>
              <td>{booking.Booking_date}</td>
              <td>{booking.total_amount}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(booking.id)}>Edit</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(booking.id)}>Delete</button>
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
                <h5 className="modal-title">Create Booking</h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close" style={{ marginLeft: 'auto' }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <BookingForm onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsList;
