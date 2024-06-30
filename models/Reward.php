<?php
class RewardModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getRewards() {
        $sql = "SELECT * FROM rewards";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $stmt->bind_result($id, $user_id, $reward_points);
        $rewards = array();
        while ($stmt->fetch()) {
            $rewards[] = array(
                'id' => $id,
                'user_id' => $user_id,
                'reward_points' => $reward_points
            );
        }
        return $rewards;
    }

    public function getRewardById($id) {
        $sql = "SELECT * FROM rewards WHERE id = ?";
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
}