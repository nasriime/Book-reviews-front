import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Signup from './components/signup/Signup';
import App from './components/app/App';
import Book from './components/book/Book';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={ Signup } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/dashboard" component={ Dashboard } />
            <Route exact path="/book/:id" component={ Book } />
            <Route exact path="/app" component={ App } />
        </div>
    </ Router>
, document.getElementById('root'));
registerServiceWorker();