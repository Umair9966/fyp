<?php

// models/Theater.php

class Theater {
    private $id;
    private $name;
    private $address;
    private $capacity;

    public function __construct($id, $name, $address, $capacity) {
        $this->id = $id;
        $this->name = $name;
        $this->address = $address;
        $this->capacity = $capacity;
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getAddress() {
        return $this->address;
    }

    public function getCapacity() {
        return $this->capacity;
    }

    public function getSeats() {
        // retrieve seats for this theater
        $seats = array();
        $query = "SELECT * FROM seats WHERE theater_id = '$this->id'";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $seats[] = new Seat($row['id'], $row['theater_id'], $row['seat_number'], $row['seat_type']);
        }
        return $seats;
    }

    public function getShowtimes() {
        // retrieve showtimes for this theater
        $showtimes = array();
        $query = "SELECT * FROM showtimes WHERE theater_id = '$this->id'";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $showtimes[] = new Showtime($row['id'], $row['movie_id'], $row['theater_id'], $row['showtime'], $row['available_seats']);
        }
        return $showtimes;
    }
}