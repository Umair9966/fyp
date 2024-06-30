
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

    public function create() {
        $name = $_POST['name'];
        $address = $_POST['address'];
        $capacity = $_POST['capacity'];
        $query = "INSERT INTO theaters (name, address, capacity) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ssi", $name, $address, $capacity);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Theatre created successfully']);
        } else {
            echo json_encode(['error' => 'Error creating theatre']);
        }
    }

    public function update($id) {
        echo json_encode($_POST);exit;
        $name = $_POST['name'];
        $address = $_POST['address'];
        $capacity = $_POST['capacity'];
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
        $query = "DELETE FROM theaters WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Theatre deleted successfully']);
        } else {
            echo json_encode(['error' => 'Error deleting theatre']);
        }
    }
}
?>
