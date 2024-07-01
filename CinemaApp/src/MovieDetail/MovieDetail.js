// src/MovieDetail.js
import React, {useEffect, useState} from 'react';
import './MovieDetail.css';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from "../Header/Header";


const MovieDetail = () => {
    const location = useLocation();
    const movie = location.state;
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [ticketCount, setTicketCount] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    const maxNumberOfTickets = 70


    useEffect(() => {
        if (selectedTimeSlot) {
            setTotalAmount(ticketCount * Number(selectedTimeSlot.price))
        }
    }, [ticketCount]);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    const incrementTicketCount = () => {
        setTicketCount(ticketCount + 1);

    };

    const decrementTicketCount = () => {
        if (ticketCount > 1) {
            setTicketCount(ticketCount - 1);
        }
    };

    const selectTimeSlot = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
        setTotalAmount(ticketCount * Number(timeSlot.price))
    };

    const calculateTotalAvailableTickets = (bookedSeats) => {
        const availableTickets = maxNumberOfTickets - bookedSeats.length
        if (availableTickets < ticketCount) {
            alert(`Only ${availableTickets} tickets are available for this show`)
            return false
        }
        return true

    }

    const handleProceedToSeatSelection = () => {
        if (selectedTimeSlot) {
            const bookedSeats = selectedTimeSlot.booked_seats || []
            if (calculateTotalAvailableTickets(bookedSeats))
                navigate('/seat-selection', {
                    state: {

                        ticketCount: ticketCount,
                        timeSlot: selectedTimeSlot,
                        selectedMovie: movie,
                        theater: selectedTheatre,
                        totalAmount: totalAmount
                    }
                });
        } else {
            alert("Please select a time slot.");
        }
    };


    return (
        <div>
            <Header/>

            <div className="movie-detail-container">

                <div className="movie-thumbnail-container">
                    <img src={movie.thumbnail} alt={movie.title}/>
                    <h1>{movie.title}</h1>
                    <p className="genre-rating">{movie.genre} | Rating: {movie.rating?.toFixed(1)}</p>
                    <p className="description">{movie.description}</p>
                    <div className="ticket-selection">
                        <h2>Number of Tickets</h2>
                        <div className="ticket-controls">
                            <button onClick={decrementTicketCount}>-</button>
                            <span>{ticketCount}</span>
                            <button onClick={incrementTicketCount}>+</button>
                        </div>

                    </div>
                    <h4>{`Total Price: ${totalAmount.toFixed(2)} PKR`}</h4>
                    {movie.showtimes.map((screen, index) => (
                        <div key={index} className="screen-section">
                            <h2>{screen.theatre.name}</h2>
                            <div className="time-slots">
                                {screen.slots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className={`time-slot ${selectedTimeSlot?.time === slot.time ? 'selected' : ''}`}
                                        onClick={() => {
                                            selectTimeSlot(slot)
                                            setSelectedTheatre(screen.theatre)
                                        }}
                                    >
                                        {slot.time} - PKR {slot.price}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button className="proceed-button" onClick={handleProceedToSeatSelection}>Proceed to Seat
                        Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
