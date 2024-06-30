<?php

// models/Ticket.php

class Ticket {
    private $id;
    private $userId;
    private $showtimeId;
    private $redeemed;

    public function __construct($id, $userId, $showtimeId, $redeemed) {
        $this->id = $id;
        $this->userId = $userId;
        $this->showtimeId = $showtimeId;
        $this->redeemed = $redeemed;
    }

    public function getId() {
        return $this->id;
    }

    public function getUserId() {
        return $this->userId;
    }

    public function getShowtimeId() {
        return $this->showtimeId;
    }

    public function getRedeemed() {
        return $this->redeemed;
    }

    public function getUser() {
        // retrieve user for this ticket
        $user = null;
        $query = "SELECT * FROM users WHERE id = '$this->userId'";
        $result = mysqli_query($conn, $query);
        if ($row = mysqli_fetch_assoc($result)) {
            $user = new User($row['id'], $row['username'], $row['email'], $row['password']);
        }
        return $user;
    }

    public function getShowtime() {
        // retrieve showtime for this ticket
        $showtime = null;
        $query = "SELECT * FROM showtimes WHERE id = '$this->showtimeId'";
        $result = mysqli_query($conn, $query);
        if ($row = mysqli_fetch_assoc($result)) {
            $showtime = new Showtime($row['id'], $row['movie_id'], $row['theater_id'], $row['showtime'], $row['available_seats']);
        }
        return $showtime;
    }

    public function getTicketSeats() {
        // retrieve ticket seats for this ticket
        $ticketSeats = array();
        $query = "SELECT * FROM ticket_seats WHERE ticket_id = '$this->id'";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $ticketSeats[] = new TicketSeat($row['id'], $row['ticket_id'], $row['seat_id']);
        }
        return $ticketSeats;
    }
}