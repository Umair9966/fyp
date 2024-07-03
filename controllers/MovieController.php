
<?php

class MovieController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function dashboard() {
        $sql = "SELECT * FROM movies";
        $result = $this->db->query($sql);
    
        $data = [];
        if ($result->num_rows > 0) {
            while ($movie = $result->fetch_assoc()) {
                $movie_id = $movie['id'];
    
                // Fetch showtimes for each movie
                $showtimes_sql = "
                    SELECT showtimes.*, theaters.name as theatre_name, theaters.address as theatre_address, theaters.capacity as theatre_capacity 
                    FROM showtimes 
                    JOIN theaters ON showtimes.theater_id = theaters.id 
                    WHERE showtimes.movie_id = $movie_id
                ";
                $showtimes_result = $this->db->query($showtimes_sql);
    
                $formattedShowtimes = [];
                if ($showtimes_result->num_rows > 0) {
                    while ($showtime = $showtimes_result->fetch_assoc()) {
                        $showtime_id = $showtime['id'];
    
                        // Fetch slots for each showtime
                        $slots_sql = "SELECT * FROM slots WHERE showtime_id = $showtime_id";
                        $slots_result = $this->db->query($slots_sql);
    
                        $slots = [];
                        if ($slots_result->num_rows > 0) {
                            while ($slot = $slots_result->fetch_assoc()) {
                                // Fetch booked seats for each slot
                                $booked_seats_sql = "
                                    SELECT GROUP_CONCAT(seat_number) as booked_seats 
                                    FROM seats 
                                    WHERE theater_id = ?
                                ";
                                $stmt = $this->db->prepare($booked_seats_sql);
                                $stmt->bind_param("i", $showtime['theater_id']);
                                $stmt->execute();
                                $booked_seats_result = $stmt->get_result()->fetch_assoc();
    
                                $slots[] = [
                                    'id' => $slot['id'],
                                    'time' => $slot['time'],
                                    'price' => $slot['price'],
                                    'booked_seats' => explode(',', $booked_seats_result['booked_seats'])
                                ];
                            }
                        }
    
                        $formattedShowtimes[] = [
                            'theatre' => [
                                'id' => $showtime['theater_id'],
                                'name' => $showtime['theatre_name'],
                                'address' => $showtime['theatre_address'],
                                'capacity' => $showtime['theatre_capacity']
                            ],
                            'slots' => $slots
                        ];
                    }
                }
    
                $data[] = [
                    'id' => $movie['id'],
                    'title' => $movie['title'],
                    'genre' => $movie['genre'],
                    'rating' => self::getRandomValue(),
                    'thumbnail' => $movie['thumbnail'],
                    'nowShowing' => (bool) $movie['nowShowing'],
                    'description' => $movie['description'],
                    'showtimes' => $formattedShowtimes
                ];
            }
        }
    
        echo json_encode($data);
    }

    public function getRandomValue($min = 1, $max = 9) {
        $integerPart = mt_rand($min, $max);
        $decimalPart = mt_rand(0, 99) / 100;
        return $integerPart + $decimalPart;
    }

    public function getAllMovies() {
        // if (!TokenMiddleware::checkToken()) return;
        $query = "SELECT * FROM movies";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $movies = array();
        while ($row = $result->fetch_assoc()) {
            $movies[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($movies);
    }

    public function saveOrUpdateMovie($id = null, $data = []) {
        $title = $data['title'] ?? null;
        $description = $data['description'] ?? null;
        $release_date = $data['release_date'] ?? null;
        $genre = $data['genre'] ?? null;
        $thumbnail = $data['thumbnail'] ?? null;
        $background_image = $data['background_image'] ?? null;
        $nowShowing = isset($data['nowShowing']) && ($data['nowShowing'] === 'true' || $data['nowShowing'] === '1') ? 1 : 0;
        $theater_id = $data['theater_id'] ?? null;

        if ($id !== null) {
            // Check if the movie exists
            $checkSql = "SELECT * FROM movies WHERE id = ?";
            $checkStmt = $this->db->prepare($checkSql);
            $checkStmt->bind_param("i", $id);
            $checkStmt->execute();
            $result = $checkStmt->get_result();
            if ($result->num_rows === 0) {
                http_response_code(404);
                echo json_encode(['message' => 'Movie not found']);
                return;
            }

            // Update existing movie
            $sql = "UPDATE movies SET title = ?, description = ?, release_date = ?, genre = ?, thumbnail = ?, background_image = ?, nowShowing = ?, theater_id = ? WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            if ($stmt === false) {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to prepare statement']);
                return;
            }
            $stmt->bind_param("ssssssiii", $title, $description, $release_date, $genre, $thumbnail, $background_image, $nowShowing, $theater_id, $id);
        } else {
            // Create new movie
            $sql = "INSERT INTO movies (title, description, release_date, genre, thumbnail, background_image, nowShowing, theater_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $this->db->prepare($sql);
            if ($stmt === false) {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to prepare statement']);
                return;
            }
            $stmt->bind_param("ssssssii", $title, $description, $release_date, $genre, $thumbnail, $background_image, $nowShowing, $theater_id);
        }

        if ($stmt->execute()) {
            if ($stmt->affected_rows === 0) {
                http_response_code(400);
                echo json_encode(['message' => 'No rows affected.']);
            } else {
                echo json_encode(['message' => 'Movie ' . ($id ? 'updated' : 'created') . ' successfully']);
            }
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to ' . ($id ? 'update' : 'create') . ' movie']);
        }
    }
    
    

    public function saveMovie($data) {

        $title = $data['title'] ?? null;
        $description = $data['description'] ?? null;
        $release_date = $data['release_date'] ?? null;
        $genre = $data['genre'] ?? null;
        $thumbnail = $data['thumbnail'] ?? null;
        $background_image = $data['background_image'] ?? null;
        $nowShowing = isset($data['nowShowing']) &&( $data['nowShowing'] === 'true' ||  $data['nowShowing'] === '1') ? 1 : 0;
        $theater_id = $data['theater_id'] ?? null;

        if ($id !== null) {
            echo $id;
            // Check if the movie exists
            $checkSql = "SELECT * FROM movies WHERE id = ?";
            $checkStmt = $this->db->prepare($checkSql);
            $checkStmt->bind_param("i", $id);
            $checkStmt->execute();
            $result = $checkStmt->get_result();
            if ($result->num_rows === 0) {
                http_response_code(404);
                echo json_encode(['message' => 'Movie not found']);
                return;
            }

            // Update existing movie
            $sql = "UPDATE movies SET title = ?, description = ?, release_date = ?, genre = ?, thumbnail = ?, background_image = ?, nowShowing = ?, theater_id = ? WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            if ($stmt === false) {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to prepare statement']);
                return;
            }
            $stmt->bind_param("ssssssiii", $title, $description, $release_date, $genre, $thumbnail, $background_image, $nowShowing, $theater_id, $id);
        } else {
            // Create new movie
            $sql = "INSERT INTO movies (title, description, release_date, genre, thumbnail, background_image, nowShowing, theater_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $this->db->prepare($sql);
            if ($stmt === false) {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to prepare statement']);
                return;
            }
            $stmt->bind_param("ssssssii", $title, $description, $release_date, $genre, $thumbnail, $background_image, $nowShowing, $theater_id);
        }

        if ($stmt->execute()) {
            if ($stmt->affected_rows === 0) {
                http_response_code(400);
                echo json_encode(['message' => 'No rows affected.']);
            } else {
                echo json_encode(['message' => 'Movie ' . ($id ? 'updated' : 'created') . ' successfully']);
            }
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to ' . ($id ? 'update' : 'create') . ' movie']);
        }
    }
    
}
?>
