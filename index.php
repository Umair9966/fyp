<?php

// Disable all error reporting
error_reporting(1);
ini_set('display_errors', 1);

define('BASEPATH', __DIR__ . '/system/');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight request
    http_response_code(200);
    exit();
}

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'fyp');

// Create a connection to the database
$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Load required files
$router = require 'config/routes.php';
require_once 'models/User.php';
require_once 'models/Booking.php';
require_once 'models/Reward.php';
require_once 'controllers/UserController.php';
require_once 'controllers/BookingController.php';
require_once 'controllers/MovieController.php';
require_once 'controllers/TheatreController.php';
require_once 'controllers/RewardController.php';

// Create instances of models and controllers
$user = new User($conn);
$booking = new Booking($conn);
$reward = new Reward($conn);
$userController = new UserController($conn);
$bookingController = new BookingController($booking);
$movieController = new MovieController($conn);
$theatreController = new TheatreController($conn);
$rewardController = new RewardController($reward);

$controllerMappings = [
    'UserController' => $userController,
    'BookingController' => $bookingController,
    'MovieController' => $movieController,
    'TheatreController' => $theatreController,
    'RewardController' => $rewardController,
];

// Match the current request
$match = $router->match();

if ($match) {
    list($controllerName, $action) = explode('@', $match['target']);
    $controllerName = ucfirst($controllerName);
    if (isset($controllerMappings[$controllerName])) {
        $controller = $controllerMappings[$controllerName];
        $params = array_values($match['params']);
        
        // Ensure POST data is captured correctly
        $rawInput = file_get_contents('php://input');
        $requestData = json_decode($rawInput, true);
        
        if (is_null($requestData)) {
            $requestData = [];
        }
        
        $params[] = $requestData;
        
        call_user_func_array([$controller, $action], $params);
    } else {
        echo "Controller $controllerName not found";
    }
} else {
    header("HTTP/1.0 404 Not Found");
    echo '404 Not Found';
}
