
<?php

require_once 'controllers/TokenMiddleware.php';

require 'config/PHPMailer/src/Exception.php';
require 'config/PHPMailer/src/PHPMailer.php';
require 'config/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class UserController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function index() {
        // if (!TokenMiddleware::checkToken()) return;
        $query = "SELECT * FROM users";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $users = array();
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($users);
    }

    public function userCreate($data) {
        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];
        
        if (empty($username) || empty($email) || empty($password)) {
            echo json_encode(['error' => 'All fields are required']);
            return;
        }

        // Check if email already exists
        $checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->db->prepare($checkEmailQuery);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(['error' => 'Email already exists']);
            return;
        }

        // Insert new user
        $query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("sss", $username, $email, md5($password));
        if ($stmt->execute()) {
            // Get the last inserted ID
            $last_id = $this->db->insert_id;
            
            // Retrieve the last inserted data
            $sql = "SELECT * FROM users WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->bind_param("i", $last_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $last_data = $result->fetch_assoc();

            echo json_encode(['message' => 'User created successfully', 'user' => $last_data]);
        } else {
            echo json_encode(['error' => 'Error creating user']);
        }
    }

    public function userUpdate($id, $data) {
        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];

        if (empty($username) || empty($email)) {
            echo json_encode(['error' => 'Username and email are required']);
            return;
        }

        // Check if user exists
        $checkUserQuery = "SELECT * FROM users WHERE id = ?";
        $stmt = $this->db->prepare($checkUserQuery);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            echo json_encode(['error' => 'User not found']);
            return;
        }

        // Update user
        $query = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $hashedPassword = !empty($password) ? md5($password) : null;

        if ($hashedPassword) {
            $stmt->bind_param("sssi", $username, $email, $hashedPassword, $id);
        } else {
            $stmt->bind_param("ssi", $username, $email, $id);
            $query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
        }

        if ($stmt->execute()) {
            // Retrieve the updated data
            $sql = "SELECT * FROM users WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $updated_data = $result->fetch_assoc();

            echo json_encode(['message' => 'User updated successfully', 'user' => $updated_data]);
        } else {
            echo json_encode(['error' => 'Error updating user']);
        }
    }

    public function login() {
        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $query = "SELECT * FROM users WHERE email = ? AND password = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ss", $email, md5($password));
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        if ($user) {
            // $token = JWT::encode(['id' => $user['id'], 'email' => $user['email']]);
            echo json_encode(['user' => $user, 'message' => 'Login Successful']);
        } else {
            echo json_encode(['error' => 'Invalid email or password']);
        }
    }

    public function register() {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $query = "INSERT INTO users (email, password) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ss", $email, md5($password));
        if ($stmt->execute()) {
            // Get the last inserted ID
            $last_id = $this->db->insert_id;
            
            // Retrieve the last inserted data
            $sql = "SELECT * FROM users WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->bind_param("i", $last_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $last_data = $result->fetch_assoc();

            echo json_encode(['message' => 'User registered successfully', 'user' => $last_data]);
        } else {
            echo json_encode(['error' => 'Error registering user']);
        }
    }

    public function forgotPassword() {
        $email = $_POST['email'];

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Check if email exists in the database
            $sql = "SELECT * FROM users WHERE email = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                // Generate a random password
                $newPassword = $this->generateRandomPassword();
                $hashedPassword = md5($newPassword);

                // Update the user's password in the database
                $sql = "UPDATE users SET password = ? WHERE email = ?";
                $stmt = $this->db->prepare($sql);
                $stmt->bind_param("ss", $hashedPassword, $email);

                if ($stmt->execute()) {
                    // Send the new password to the user's email address
                    if ($this->sendNewPasswordEmail($email, $newPassword)) {
                        echo "A new password has been sent to your email address.";
                    } else {
                        echo "Failed to send the new password email.";
                    }
                } else {
                    echo "Failed to update the password.";
                }
            } else {
                echo "Email address not found.";
            }
        } else {
            echo "Invalid email address.";
        }
    }

    private function generateRandomPassword($length = 8) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomPassword = '';

        for ($i = 0; $i < $length; $i++) {
            $randomPassword .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomPassword;
    }

    private function sendNewPasswordEmail($email, $newPassword) {
        $mail = new PHPMailer(true);
        // try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.sendgrid.net';
            $mail->SMTPAuth = true;
            $mail->Username = 'apikey'; // SendGrid SMTP username is always 'apikey'
            $mail->Password = 'your_sendgrid_api_key'; // Replace with your SendGrid API key
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom('no-reply@sendgrid.com', 'CineTech Cinema');
            $mail->addAddress($email);

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Your New Password';
            $mail->Body    = 'Your new password is: ' . $newPassword;

            $mail->send();
            echo json_encode($mail);
            return true;
        // } catch (Exception $e) {
        //     error_log('Mailer Error: ' . $mail->ErrorInfo);
        //     return false;
        // }
    }
}
?>
