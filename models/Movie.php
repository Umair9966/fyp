<?php

// models/Movie.php

class Movie {
    private $id;
    private $title;
    private $description;
    private $releaseDate;
    private $genre;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getReleaseDate() {
        return $this->releaseDate;
    }

    public function getGenre() {
        return $this->genre;
    }

    public function getShowtimes() {
        // retrieve showtimes for this movie
        $showtimes = array();
        $query = "SELECT * FROM showtimes WHERE movie_id = '$this->id'";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $showtimes[] = new Showtime($row['id'], $row['movie_id'], $row['theater_id'], $row['showtime'], $row['available_seats']);
        }
        return $showtimes;
    }
}