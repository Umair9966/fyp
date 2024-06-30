<?php

class Booking {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function all() {
        $query = "
            SELECT 
                b.id, 
                b.customer_id, 
                u.username as customer_name, 
                b.show_id, 
                m.title as movie_name, 
                b.number_of_tickets, 
                b.seat_details, 
                b.booking_date 
            FROM booking b
            JOIN users u ON b.customer_id = u.id
            JOIN movies m ON b.show_id = m.id
        ";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $booking = array();
    
        while ($row = $result->fetch_assoc()) {
            $booking[] = $row;
        }
    
        header('Content-Type: application/json');
        return $booking;
    }
    

    public function create($data) {
        // Extract data from POST request
        $customer_id = $data['customer_id'];
        $show_id = $data['show_id'];
        $number_of_tickets = $data['number_of_tickets'];
        $seats_booked = $data['seats_booked'];
        $Booking_date = $data['booking_date'];
        $date = DateTime::createFromFormat('D M d Y', $Booking_date);
        $Booking_date = $date->format('Y-m-d');
        $total_amount = $data['total_amount'];
        $theater_id = $data['theater_id'];
    
        // Check if seats record exists for the theater_id
        $check_seats_query = "SELECT id, seat_number FROM seats WHERE theater_id = ?";
        $check_seats_stmt = $this->db->prepare($check_seats_query);
        $check_seats_stmt->bind_param("i", $theater_id);
        $check_seats_stmt->execute();
        $check_seats_result = $check_seats_stmt->get_result();
    
        if ($check_seats_result->num_rows > 0) {
            // Record exists, append the seat numbers
            $row = $check_seats_result->fetch_assoc();
            $existing_seat_numbers = $row['seat_number'];
            $new_seat_numbers = empty($existing_seat_numbers) ? $seats_booked : $existing_seat_numbers . ',' . $seats_booked;
            $seat_detail_id = $row['id'];
    
            $update_seats_query = "UPDATE seats SET seat_number = ? WHERE id = ?";
            $update_seats_stmt = $this->db->prepare($update_seats_query);
            $update_seats_stmt->bind_param("si", $new_seat_numbers, $seat_detail_id);
            $update_seats_stmt->execute();

        } else {
            // No record exists, insert new record
            $insert_seats_query = "INSERT INTO seats (theater_id, seat_number) VALUES (?, ?)";
            $insert_seats_stmt = $this->db->prepare($insert_seats_query);
            $insert_seats_stmt->bind_param("is", $theater_id, $seats_booked);
            $insert_seats_stmt->execute();
    
            $seat_detail_id = $this->db->insert_id;  // Get the last inserted ID for seats table
        }
    
        // Insert booking details into booking table
        $booking_query = "INSERT INTO booking (customer_id, show_id, number_of_tickets, seat_details, Booking_date, total_amount) VALUES (?, ?, ?, ?, ?, ?)";
        $booking_stmt = $this->db->prepare($booking_query);
        $booking_stmt->bind_param("iiissi", $customer_id, $show_id, $number_of_tickets, $seats_booked, $Booking_date, $total_amount);
        $booking_stmt->execute();
    
        if ($booking_stmt->affected_rows > 0) {
            $response = array("message" => "Booking created successfully");
            return $response;
        } else {
            $response = array("error" => "Error creating booking");
            return $response;
        }
    }
    
    

    public function show($id) {
        $query = "SELECT * FROM booking WHERE id =?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $booking = $result->fetch_assoc();

        if (!$booking) {
            $response = array("error" => "Booking not found");
            header('Content-Type: application/json');
            echo json_encode($response);
            return;
        }

        $response = $booking;
        echo json_encode($response);
    }

    public function update($id) {
        $data = $_POST;
        $query = "UPDATE booking SET title = ?, description = ?, start_time = ?, end_time = ? WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ssssi", $title, $description, $start_time, $end_time, $id);
        $title = $data['title'];
        $description = $data['description'];
        $start_time = $data['start_time'];
        $end_time = $data['end_time'];
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array("message" => "Booking updated successfully");
            echo json_encode($response);
        } else {
            $response = array("error" => "Error updating booking");
            echo json_encode($response);
        }
    }

    public function destroy($id) {
        $query = "DELETE FROM booking WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array("message" => "Booking deleted successfully");
            echo json_encode($response);
        } else {
            $response = array("error" => "Error deleting booking");
            echo json_encode($response);
        }
    }
}