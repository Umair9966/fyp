<?php
require_once 'config/AltoRouter/AltoRouter.php';

$router = new AltoRouter();

// Map your routes
$router->map('GET', '/dashboard', 'MovieController@dashboard');
$router->map('GET', '/', 'UserController@index');
$router->map('POST', '/login', 'UserController@login');
$router->map('POST', '/register', 'UserController@register');
$router->map('POST', '/forgot_password', 'UserController@forgotPassword');
$router->map('GET', '/users', 'UserController@index');
$router->map('POST', '/create-user', 'UserController@userCreate');
$router->map('POST', '/update-user/[i:id]', 'UserController@userUpdate');
$router->map('GET', '/users/[i:id]', 'UserController@show');
$router->map('POST', '/users', 'UserController@login');
$router->map('POST', '/user-register', 'UserController@register');
$router->map('DELETE', '/users/[i:id]', 'UserController@delete');
$router->map('GET', '/movies', 'MovieController@getAllMovies');
$router->map('GET', '/movies/[i:id]', 'MovieController@show');
$router->map('POST', '/movies', 'MovieController@saveMovie');
$router->map('POST', '/movies/[i:id]', 'MovieController@UpdateMovie');
$router->map('DELETE', '/movies/[i:id]', 'MovieController@delete');
$router->map('GET', '/search_movies', 'MovieController@searchMovies');
$router->map('GET', '/bookings', 'BookingController@index');
$router->map('GET', '/bookings/[i:id]', 'BookingController@show');
$router->map('POST', '/add-booking', 'BookingController@create');
$router->map('PUT', '/bookings/[i:id]', 'BookingController@update');
$router->map('DELETE', '/bookings/[i:id]', 'BookingController@delete');
$router->map('GET', '/theatres', 'TheatreController@index');
$router->map('GET', '/theatres/[i:id]', 'TheatreController@show');
$router->map('POST', '/theatres', 'TheatreController@create');
$router->map('PUT', '/theatres/[i:id]', 'TheatreController@update');
$router->map('DELETE', '/theatres/[i:id]', 'TheatreController@delete');

return $router;
