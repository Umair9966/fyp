<?php

class JWT {
    private static $header = ['typ' => 'JWT', 'alg' => 'HS256'];
    private static $secretKey = 'your_secret_key_here';

    public static function encode($payload) {
        $header = json_encode(self::$header);
        $payload = json_encode($payload);
        $signature = self::sign($header, $payload);
        return $header . '.' . $payload . '.' . $signature;
    }

    public static function decode($token) {
        list($header, $payload, $signature) = explode('.', $token);
        if (!self::verify($header, $payload, $signature)) {
            throw new Exception('Invalid token');
        }
        return json_decode($payload, true);
    }

    private static function sign($header, $payload) {
        $data = $header . '.' . $payload;
        return hash_hmac('sha256', $data, self::$secretKey);
    }

    private static function verify($header, $payload, $signature) {
        $data = $header . '.' . $payload;
        return hash_hmac('sha256', $data, self::$secretKey) === $signature;
    }
}