import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

axios.defaults.baseURL = 'http://cinema.local/';



ReactDOM.render(<App />, document.getElementById('root'));
