import React, { useState } from 'react';
import BookingsList from '../components/Bookings/BookingsList';
import BookingForm from '../components/Bookings/BookingForm';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const BookingsPage = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Bookings Management</h2>
      <div className="card">
        <div className="card-body">
          <BookingsList />
        </div>
      </div>
      {/* <BookingForm booking={selectedBooking} setBooking={setSelectedBooking} /> */}
    </div>
  );
};

export default BookingsPage;
