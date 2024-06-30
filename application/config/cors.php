<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function handle_cors() {
    $CI =& get_instance();
    $CI->output
       ->set_header("Access-Control-Allow-Origin: *")
       ->set_header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS")
       ->set_header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        // Handle preflight request
        $CI->output
           ->set_status_header(200)
           ->_display();
        exit();
    }
}
