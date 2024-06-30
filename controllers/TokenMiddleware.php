<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class TokenMiddleware {

    public static function checkToken() {
        $headers = self::getRequestHeaders();
        
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Authorization header not found']);
            exit();
        }
        
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        
        // Validate the token (replace 'your-secret-token' with your actual token)
        if ($token !== 'your-secret-token') {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token']);
            exit();
        }

        // If needed, set user data or perform other actions after token validation
    }

    private static function getRequestHeaders() {
        $headers = [];
        foreach ($_SERVER as $key => $value) {
            if (substr($key, 0, 5) == 'HTTP_') {
                $header = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($key, 5)))));
                $headers[$header] = $value;
            }
        }
        return $headers;
    }
}
?>
