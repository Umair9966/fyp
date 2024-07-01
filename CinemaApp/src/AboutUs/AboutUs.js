import React from 'react';
import './AboutUs.css';
import Header from "../Header/Header";

const AboutUs = () => {
    return (
        <div>
            <Header/>
        <div className="about-us">
            <div className="content">
                <h1>About CineTech</h1>
                <p>
                    Welcome to CineTech, your ultimate destination for a seamless and immersive cinema booking experience. At CineTech, we are dedicated to bringing you the latest movies with the best booking experience possible.
                </p>
                <h2>Our Mission</h2>
                <p>
                    Our mission is to make movie-going an easy and enjoyable experience. With CineTech, you can effortlessly browse the latest movies, check showtimes, and book your favorite seats all in one place.
                </p>
                <h2>Features</h2>
                <ul>
                    <li>Easy and quick online booking</li>
                    <li>Real-time seat availability</li>
                    {/*<li>Secure payment options</li>*/}
                    <li>Latest movie trailers and reviews</li>
                    {/*<li>Exclusive member discounts</li>*/}
                </ul>
                <h2>Contact Us</h2>
                <p>
                    Have questions or need assistance? Our customer support team is here to help. Reach out to us at support@cinetech.com or call us at (123) 456-7890.
                </p>
                <p>Thank you for choosing CineTech. Enjoy your movie!</p>
            </div>
        </div>
        </div>
    );
};

export default AboutUs;
