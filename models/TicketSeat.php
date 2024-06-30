<?php

// models/TicketSeat.php

class TicketSeat {
    private $id;
    private $ticketId;
    private $seatId;

    public function __construct($id, $ticketId, $seatId) {
        $this->id = $id;
        $this->ticketId = $ticketId;
        $this->seatId = $seatId;
    }

    public function getId() {
        return $this->id;
    }

    public function getTicketId() {
        return $this->ticketId;
    }

    public function getSeatId() {
        return $this->seatId;
    }

    public function getTicket() {
        // retrieve ticket for this ticket seat
        $ticket = null;
        $query = "SELECT * FROM tickets WHERE id = '$this->ticketId'";
        $result = mysqli_query($conn, $query);
        if ($row = mysqli_fetch_assoc($result)) {
            $ticket = new Ticket($row['id'], $row['user_id'], $row['showtime_id'], $row['redeemed']);
        }
        return $ticket;
    }

    public function getSeat() {
        // retrieve seat for this ticket seat
        $seat = null;
        $query = "SELECT * FROM seats WHERE id = '$this->seatId'";
        $result = mysqli_query($conn, $query);
        if ($row = mysqli_fetch_assoc($result)) {
            $seat = new Seat($row['id'], $row['theater_id'], $row['seat_number'], $row['seat_type']);
        }
        return $seat;
    }
}