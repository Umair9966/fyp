// src/Dashboard.js
import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import Header from "../Header/Header";
import {GetDashboardApiData, GetUserRewardsPointsApi} from "./DashboardNetworkCall";
import {isUserLoggedIn, setUserRewardPoints} from "../SessionStorage/SessionStorage";
import {useLocation, useNavigate} from "react-router-dom";

const moviesData = [
    {
        "id": "1",
        "title": "Title1",
        "genre": "Genre1",
        "rating": 8.74,
        "thumbnail": "Thumbnail1",
        "nowShowing": true,
        "description": "Description1",
        "showtimes": [
            {
                "theatre": {
                    "id": "2",
                    "name": "Theater2",
                    "address": "Address2",
                    "capacity": "200"
                },
                "slots": [
                    {
                        "id": "1",
                        "time": "12:00 PM",
                        "price": "500.00",
                        "booked_seats": [
                            "A1",
                            "A3",
                            "C5",
                            "D",
                            "B4",
                            "C4"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "2",
        "title": "Title2",
        "genre": "Genre2",
        "rating": 7.88,
        "thumbnail": "Thumbnail2",
        "nowShowing": true,
        "description": "Description2",
        "showtimes": [
            {
                "theatre": {
                    "id": "2",
                    "name": "Theater2",
                    "address": "Address2",
                    "capacity": "200"
                },
                "slots": [
                    {
                        "id": "4",
                        "time": "1:00 PM",
                        "price": "500.00",
                        "booked_seats": [
                            "A1",
                            "A3",
                            "C5",
                            "D",
                            "B4",
                            "C4"
                        ]
                    },
                    {
                        "id": "6",
                        "time": "7:00 PM",
                        "price": "500.00",
                        "booked_seats": [
                            "A1",
                            "A3",
                            "C5",
                            "D",
                            "B4",
                            "C4"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "3",
        "title": "Title3",
        "genre": "Genre3",
        "rating": 5.34,
        "thumbnail": "Thumbnail3",
        "nowShowing": true,
        "description": "Description3",
        "showtimes": [
            {
                "theatre": {
                    "id": "3",
                    "name": "Theater3",
                    "address": "Address3",
                    "capacity": "300"
                },
                "slots": [
                    {
                        "id": "5",
                        "time": "4:00 PM",
                        "price": "500.00",
                        "booked_seats": [
                            "A5"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "4",
        "title": "Title4",
        "genre": "Genre4",
        "rating": 10.11,
        "thumbnail": "Thumbnail4",
        "nowShowing": true,
        "description": "Description4",
        "showtimes": [
            {
                "theatre": {
                    "id": "4",
                    "name": "Theater4",
                    "address": "Address4",
                    "capacity": "400"
                },
                "slots": [
                    {
                        "id": "2",
                        "time": "3:00 PM",
                        "price": "500.00",
                        "booked_seats": [
                            "A4"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "5",
        "title": "Title5",
        "genre": "Genre5",
        "rating": 3.39,
        "thumbnail": "Thumbnail5",
        "nowShowing": true,
        "description": "Description5",
        "showtimes": [
            {
                "theatre": {
                    "id": "7",
                    "name": "Theater7",
                    "address": "Address7",
                    "capacity": "700"
                },
                "slots": []
            }
        ]
    },
    {
        "id": "6",
        "title": "Title6",
        "genre": "Genre6",
        "rating": 2.31,
        "thumbnail": "Thumbnail6",
        "nowShowing": true,
        "description": "Description6",
        "showtimes": [
            {
                "theatre": {
                    "id": "5",
                    "name": "Theater5",
                    "address": "Address5",
                    "capacity": "500"
                },
                "slots": [
                    {
                        "id": "3",
                        "time": "6:00 PM",
                        "price": "500.00",
                        "booked_seats": [
                            "A3"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "7",
        "title": "Title7",
        "genre": "Genre7",
        "rating": 10.18,
        "thumbnail": "Thumbnail7",
        "nowShowing": true,
        "description": "Description7",
        "showtimes": [
            {
                "theatre": {
                    "id": "6",
                    "name": "Theater6",
                    "address": "Address6",
                    "capacity": "600"
                },
                "slots": []
            }
        ]
    },
    {
        "id": "8",
        "title": "Title8",
        "genre": "Genre8",
        "rating": 6.58,
        "thumbnail": "Thumbnail8",
        "nowShowing": true,
        "description": "Description8",
        "showtimes": [
            {
                "theatre": {
                    "id": "8",
                    "name": "Theater8",
                    "address": "Address8",
                    "capacity": "800"
                },
                "slots": []
            }
        ]
    },
    {
        "id": "9",
        "title": "Title9",
        "genre": "Genre9",
        "rating": 3.55,
        "thumbnail": "Thumbnail9",
        "nowShowing": true,
        "description": "Description9",
        "showtimes": [
            {
                "theatre": {
                    "id": "9",
                    "name": "Theater9",
                    "address": "Address9",
                    "capacity": "900"
                },
                "slots": []
            }
        ]
    },
    {
        "id": "10",
        "title": "Title10",
        "genre": "Genre10",
        "rating": 2.01,
        "thumbnail": "Thumbnail10",
        "nowShowing": true,
        "description": "Description10",
        "showtimes": [
            {
                "theatre": {
                    "id": "10",
                    "name": "Theater10",
                    "address": "Address10",
                    "capacity": "1000"
                },
                "slots": []
            }
        ]
    },
    {
        "id": "11",
        "title": "Title11",
        "genre": "Genre11",
        "rating": 4.8,
        "thumbnail": "Thumbnail11",
        "nowShowing": true,
        "description": "Description11",
        "showtimes": []
    },
    {
        "id": "12",
        "title": "Title12",
        "genre": "Genre12",
        "rating": 5.8,
        "thumbnail": "Thumbnail12",
        "nowShowing": true,
        "description": "Description12",
        "showtimes": []
    },
    {
        "id": "13",
        "title": "Title13",
        "genre": "Genre13",
        "rating": 3.06,
        "thumbnail": "Thumbnail13",
        "nowShowing": true,
        "description": "Description13",
        "showtimes": []
    }
]

const Dashboard = () => {
    const navigate = useNavigate()
    const location = useLocation();


    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const nowShowingMovies = filteredMovies.filter(movie => movie.nowShowing);
    const upcomingMovies = filteredMovies.filter(movie => !movie.nowShowing);


    const handleOnMovieSelection = (selectedMovie) => {
        if (isUserLoggedIn()) {

            navigate('/movie', {state: selectedMovie})

        } else {
            navigate('/login')
        }
    }


    const getDashboardData = async () => {

        const dashboardResponse = await GetDashboardApiData()
        // setMovies(moviesData)
        if (dashboardResponse) {
            setMovies(dashboardResponse)
        } else {
            alert("error while getting dashboard data")
        }
    }


    const getUserRewardPointsFromServer = async () => {

        const userRewards = await GetUserRewardsPointsApi()
        if (userRewards) {
            setUserRewardPoints(userRewards.reward_points)
        }
    }


    useEffect(() => {
        getDashboardData()
        getUserRewardPointsFromServer()
    }, []);


    return (
        <div>
            <Header/>
            <div className="dashboard-container">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <div className="movie-section">
                    <h3>Now Showing</h3>
                    <div className="movie-grid">
                        {nowShowingMovies.map(movie => (
                            <div key={movie.id} className="movie-card" onClick={() => {
                                handleOnMovieSelection(movie)
                            }}>
                                <img src={movie.thumbnail} alt={movie.title} className="movie-thumbnail"/>
                                <div className="movie-info">
                                    <h4>{movie.title}</h4>
                                    <p>{movie.genre}</p>
                                    <p>Rating: {movie.rating?.toFixed(1)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="movie-section">
                    <h3>Upcoming Movies</h3>
                    <div className="movie-grid">
                        {upcomingMovies.map(movie => (
                            <div key={movie.id} className="movie-card" onClick={() => {
                                handleOnMovieSelection(movie)
                            }}>
                                <img src={movie.thumbnail} alt={movie.title} className="movie-thumbnail"/>
                                <div className="movie-info">
                                    <h4>{movie.title}</h4>
                                    <p>{movie.genre}</p>
                                    <p>Rating: {movie.rating?.toFixed(1)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
