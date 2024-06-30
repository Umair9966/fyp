
<?php

require_once 'controllers/TokenMiddleware.php';

class TheatreController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function index() {
        // if (!TokenMiddleware::checkToken()) return;
        $query = "SELECT * FROM theaters";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $theatres = array();
        while ($row = $result->fetch_assoc()) {
            $theatres[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($theatres);
    }

    public function show($id) {
        $query = "SELECT * FROM theaters WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $theatre = $result->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($theatre);
    }

    public function create($data) {
        $name = $data['name'];
        $address = $data['address'];
        $capacity = $data['capacity'];
        $query = "INSERT INTO theaters (name, address, capacity) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ssi", $name, $address, $capacity);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Theatre created successfully']);
        } else {
            echo json_encode(['error' => 'Error creating theatre']);
        }
    }

    public function update($id, $data) {
        $name = $data['name'];
        $address = $data['address'];
        $capacity = $data['capacity'];
        $query = "UPDATE theaters SET name = ?, address = ?, capacity = ? WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ssii", $name, $address, $capacity, $id);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Theatre updated successfully']);
        } else {
            echo json_encode(['error' => 'Error updating theatre']);
        }
    }

    public function delete($id) {
        // Start a transaction
        $this->db->begin_transaction();
    
        try {
            // First, delete related rows in the seats table
            $querySeats = "DELETE FROM seats WHERE theater_id = ?";
            $stmtSeats = $this->db->prepare($querySeats);
            $stmtSeats->bind_param("i", $id);
            if (!$stmtSeats->execute()) {
                throw new Exception('Error deleting related seats');
            }
    
            // Then, delete the row in the theaters table
            $queryTheater = "DELETE FROM theaters WHERE id = ?";
            $stmtTheater = $this->db->prepare($queryTheater);
            $stmtTheater->bind_param("i", $id);
            if (!$stmtTheater->execute()) {
                throw new Exception('Error deleting theater');
            }
    
            // Commit the transaction
            $this->db->commit();
    
            echo json_encode(['message' => 'Theater deleted successfully']);
        } catch (Exception $e) {
            // Rollback the transaction if something failed
            $this->db->rollback();
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
}
?>
