<?php

// models/Showtime.php

class Showtime {
    private $id;
    private $movieId;
    private $theaterId;
    private $showtime;
    private $availableSeats;

    public function __construct($id, $movieId, $theaterId, $showtime, $availableSeats) {
        $this->id = $id;
        $this->movieId = $movieId;
        $this->theaterId = $theaterId;
        $this->showtime = $showtime;
        $this->availableSeats = $availableSeats;
    }

    public function getId() {
        return $this->id;
    }

    public function getMovieId() {
        return $this->movieId;
    }

    public function getTheaterId() {
        return $this->theaterId;
    }

    public function getShowtime() {
        return $this->showtime;
    }

    public function getAvailableSeats() {
        return $this->availableSeats;
    }

    public function getMovie() {
        // retrieve movie for this showtime
        $movie = null;
        $query = "SELECT * FROM movies WHERE id = '$this->movieId'";
        $result = mysqli_query($conn, $query);
        if ($row = mysqli_fetch_assoc($result)) {
            $movie = new Movie($row['id'], $row['title'], $row['description'], $row['release_date'], $row['genre']);
        }
        return $movie;
    }

    public function getTheater() {
        // retrieve theater for this showtime
        $theater = null;
        $query = "SELECT * FROM theaters WHERE id = '$this->theaterId'";
        $result = mysqli_query($conn, $query);
        if ($row = mysqli_fetch_assoc($result)) {
            $theater = new Theater($row['id'], $row['name'], $row['address'], $row['capacity']);
        }
        return $theater;
    }

    public function getTickets() {
        // retrieve tickets for this showtime
        $tickets = array();
        $query = "SELECT * FROM tickets WHERE showtime_id = '$this->id'";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $tickets[] = new Ticket($row['id'], $row['user_id'], $row['showtime_id'], $row['redeemed']);
        }
        return $tickets;
    }
}