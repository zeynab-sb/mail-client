// react-scripts start -> start sets up the development environment and starts a server from index.js
// This is the main class where we render App Component.
import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));