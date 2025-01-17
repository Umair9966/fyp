// src/SeatSelection.js
import React, {useEffect, useState} from 'react';
import './SeatSelection.css';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from "../Header/Header";
import {confirmBooking} from "./SeatSelectionNetworkCall";
import {getUserRewardPoints} from "../SessionStorage/SessionStorage";

const SeatSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {ticketCount, timeSlot, selectedMovie, theater, totalAmount} = location.state;
    const {booked_seats} = timeSlot

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [alreadySelectedSeats, setAlreadySelectedSeats] = useState([]);
    const [rewardPoints, setRewardPoints] = useState(null);
    ;

    const handleSeatClick = (row, col) => {
        const seat = `${String.fromCharCode(65 + row)}${col + 1}`;
        const index = selectedSeats.indexOf(seat);

        const indexOfAlreadySelected = alreadySelectedSeats.indexOf(seat);
        if (indexOfAlreadySelected === -1) {
            if (index === -1 && selectedSeats.length < ticketCount) {
                setSelectedSeats([...selectedSeats, seat]);
            } else if (index !== -1) {
                setSelectedSeats(selectedSeats.filter(s => s !== seat));
            }
        }
    };

    const isSeatSelected = (row, col) => {
        return selectedSeats.includes(`${String.fromCharCode(65 + row)}${col + 1}`);
    };

    const isAlreadySeatSelected = (row, col) => {
        return alreadySelectedSeats.includes(`${String.fromCharCode(65 + row)}${col + 1}`);
    };

    const handleConfirmBooking = async () => {

        if (Number(rewardPoints) > Number(getUserRewardPoints())) {
            setRewardPoints(null)
            alert('You dont have enough reward points to redeem ')
            return
        }

        const data = {
            movieId: selectedMovie.id,
            numberOfTickets: ticketCount + "",
            seatsBooked: selectedSeats.join(','),
            bookingDate: new Date().toDateString(),
            totalAmount: totalAmount + '',
            theaterId: theater.id,
            used_rewards_points: rewardPoints !== null ? rewardPoints : 0,
            reward_redeemed: rewardPoints !== null ? 1 : 0
        }

        const response = await confirmBooking(data)
        if (response) {
            alert('Your Booking has been confirmed. Check your email for details')
            navigate('/dashboard', {
                state: {
                    bookingConfirmed: true
                }
            });
        }

    };
    const handleRewardPointsChange = (event) => {
        // Handle reward points input change logic here
        console.log("Reward Points:", event.target.value);
        setRewardPoints(event.target.value);
    };

    useEffect(() => {

        if (booked_seats && booked_seats.length > 0) {
            setAlreadySelectedSeats(booked_seats)
        }
    }, []);

    return (
        <div>
            <Header/>
            <div className="seat-selection-container">
                <h1>Select Your Seats</h1>
                <p>Tickets Selected: {ticketCount}</p>
                <div className="seats-table">
                    {Array.from({length: 7}).map((_, row) => (
                        <div key={row} className="seats-row">
                            <div className="seat-label">{String.fromCharCode(65 + row)}</div>
                            {Array.from({length: 10}).map((_, col) => (
                                <div
                                    key={col}
                                    className={`seat ${isSeatSelected(row, col) ? 'selected' : isAlreadySeatSelected(row, col) ? 'alreadyselected' : ''}`}
                                    onClick={() => handleSeatClick(row, col)}
                                >
                                    {col + 1}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="screen">Screen</div>

                <div className="selected-seats-info">
                    <h2>Selected Seats:</h2>
                    <p>{selectedSeats.join(', ')}</p>
                </div>


                <div>
                    <h2>Enter Reward Points to redeem</h2>
                    <input
                        type="text"
                        className="reward-input"
                        placeholder="Enter points"
                        onChange={handleRewardPointsChange}
                    />

                </div>


                <button className="confirm-button" onClick={handleConfirmBooking}
                        disabled={selectedSeats.length < ticketCount}>Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default SeatSelection;
