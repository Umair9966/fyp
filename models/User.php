<?php

// models/User.php

class User {
    private $id;
    private $username;
    private $email;
    private $password;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getId() {
        return $this->id;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getTickets() {
        // retrieve tickets for this user
        $tickets = array();
        $query = "SELECT * FROM tickets WHERE user_id = '$this->id'";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $tickets[] = new Ticket($row['id'], $row['user_id'], $row['showtime_id'], $row['redeemed']);
        }
        return $tickets;
    }

    public function getRewards() {
        // retrieve rewards for this user
        $rewards = array();
        $query = "SELECT * FROM rewards WHERE user_id = '$this->id'";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $rewards[] = new Reward($row['id'], $row['user_id'], $row['reward_points']);
        }
        return $rewards;
    }
}