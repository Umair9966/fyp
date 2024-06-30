
<?php

class TicketController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function purchaseTicket() {
        if (!TokenMiddleware::checkToken()) return;
        $data = $_POST;
        $user_id = $data['user_id'];
        $show_id = $data['show_id'];
        $seat_number = $data['seat_number'];

        // Implement ticket purchase logic here
        // Add reward points
        $this->addRewardPoints($user_id, 10);

        // Send email notification
        $this->sendEmailNotification($user_id, "Purchase Confirmation", "You have successfully purchased a ticket.");

        echo json_encode(['message' => 'Ticket purchased successfully and 10 reward points added.']);
    }

    public function redeemTicket() {
        if (!TokenMiddleware::checkToken()) return;
        $user_id = $_POST['user_id'];

        // Check if user has enough points to redeem
        $points = $this->getRewardPoints($user_id);
        if ($points < 100) {
            echo json_encode(['error' => 'Not enough reward points to redeem.']);
            return;
        }

        // Implement ticket redemption logic here
        $this->addRewardPoints($user_id, -100);

        // Send email notification
        $this->sendEmailNotification($user_id, "Redemption Confirmation", "You have successfully redeemed a free ticket.");

        echo json_encode(['message' => 'Ticket redeemed successfully.']);
    }

    private function addRewardPoints($user_id, $points) {
        // Implement logic to add reward points
        $query = "UPDATE users SET reward_points = reward_points + ? WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $points, $user_id);
        $stmt->execute();
    }

    private function getRewardPoints($user_id) {
        // Implement logic to get user reward points
        $query = "SELECT reward_points FROM users WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['reward_points'];
    }

    private function sendEmailNotification($user_id, $subject, $message) {
        // Implement email sending logic here
        $query = "SELECT email FROM users WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $to = $user['email'];
        $headers = 'From: noreply@yourdomain.com' . "\r\n" .
                   'Reply-To: noreply@yourdomain.com' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();
        mail($to, $subject, $message, $headers);
    }
}
?>
