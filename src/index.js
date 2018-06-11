import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/app/App';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Signup from './components/signup/Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={ Signup } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/dashboard" component={ Dashboard } />
        </div>
    </ Router>
, document.getElementById('root'));
registerServiceWorker();