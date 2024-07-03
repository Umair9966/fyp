<?php
class Reward {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getRewards() {
        $sql = "SELECT * FROM rewards";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $reward = $result->fetch_assoc();
        return $reward;
    }

    public function getRewardById($id) {
        $sql = "SELECT * FROM rewards WHERE user_id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->bind_result($id, $user_id, $reward_points);
        $stmt->fetch();
        return array(
            'id' => $id,
            'user_id' => $user_id,
            'reward_points' => $reward_points
        );
    }

    public function createReward($user_id, $reward_points) {
        $sql = "INSERT INTO rewards (user_id, reward_points) VALUES (?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ii", $user_id, $reward_points);
        if ($stmt->execute()) {
            return $this->conn->insert_id;
        } else {
            throw new Exception("Error creating reward: " . $stmt->error);
        }
    }

    public function updateReward($id, $user_id, $reward_points) {
        $sql = "UPDATE rewards SET user_id = ?, reward_points = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("iii", $user_id, $reward_points, $id);
        if ($stmt->execute()) {
            return true;
        } else {
            throw new Exception("Error updating reward: " . $stmt->error);
        }
    }

    public function deleteReward($id) {
        $sql = "DELETE FROM rewards WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            return true;
        } else {
            throw new Exception("Error deleting reward: " . $stmt->error);
        }
    }

    public function rewardRedeemed($user_id, $pointsChange) {
        // Fetch current reward points
        $query = "SELECT reward_points FROM rewards WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $currentPoints = $row['reward_points'];
            $newPoints = $currentPoints + $pointsChange;

            // Update reward points
            $update_query = "UPDATE rewards SET reward_points = ? WHERE user_id = ?";
            $update_stmt = $this->conn->prepare($update_query);
            $update_stmt->bind_param("ii", $newPoints, $user_id);
            $update_stmt->execute();
        } else {
            // Insert new record if user doesn't have rewards entry
            $insert_query = "INSERT INTO rewards (user_id, reward_points) VALUES (?, ?)";
            $insert_stmt = $this->conn->prepare($insert_query);
            $insert_stmt->bind_param("ii", $user_id, $pointsChange);
            $insert_stmt->execute();
        }
    }
}