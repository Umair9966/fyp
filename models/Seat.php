<?php

// models/Seat.php

class Seat {
    private $id;
    private $theaterId;
    private $seatNumber;
    private $seatType;

    public function __construct($id, $theaterId, $seatNumber, $seatType) {
        $this->id = $id;
        $this->theaterId = $theaterId;
        $this->seatNumber = $seatNumber;
        $this->seatType = $seatType;
    }

    public function getId() {
        return $this->id;
    }

    public function getTheaterId() {
        return $this->theaterId;
    }

    public function getSeatNumber() {
        return $this->seatNumber;
    }

    public function getSeatType() {
        return $this->seatType;
    }

    public function getTheater() {
        // retrieve theater for this seat
        $theater = null;
        $query = "SELECT * FROM theaters WHERE id = '$this->theaterId'";
        $result = mysqli_query($conn, $query);
        if ($row = mysqli_fetch_assoc($result)) {
            $theater = new Theater($row['id'], $row['name'], $row['address'], $row['capacity']);
        }
        return $theater;
    }

    public function getTicketSeats() {
        // retrieve ticket seats for this seat
        $ticketSeats = array();
        $query = "SELECT * FROM ticket_seats WHERE seat_id = '$this->id'";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $ticketSeats[] = new TicketSeat($row['id'], $row['ticket_id'], $row['seat_id']);
        }
        return $ticketSeats;
    }
}