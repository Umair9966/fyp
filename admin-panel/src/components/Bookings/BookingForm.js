import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';

const BookingForm = ({ booking, setBooking }) => {
    const [formData, setFormData] = useState(booking || { customer_id: '', show_id: '', number_of_tickets: '', seat_detail_id: '', Booking_date: '', total_amount: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (booking) {
            axios.put(`/bookings/${booking.id}`, formData)
                .then(response => setBooking(response.data))
                .catch(error => console.error(error));
        } else {
            axios.post('/bookings', formData)
                .then(response => setBooking(response.data))
                .catch(error => console.error(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="customer_id" value={formData.customer_id} onChange={handleChange} placeholder="Customer ID" required />
            <input type="number" name="show_id" value={formData.show_id} onChange={handleChange} placeholder="Show ID" required />
            <input type="number" name="number_of_tickets" value={formData.number_of_tickets} onChange={handleChange} placeholder="Number of Tickets" required />
            <input type="number" name="seat_detail_id" value={formData.seat_detail_id} onChange={handleChange} placeholder="Seat Detail ID" required />
            <input type="date" name="Booking_date" value={formData.Booking_date} onChange={handleChange} required />
            <input type="number" name="total_amount" value={formData.total_amount} onChange={handleChange} placeholder="Total Amount" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default BookingForm;
