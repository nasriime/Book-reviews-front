import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login/Login.component';
import Dashboard from './components/dashboard/Dashboard.component';
import Signup from './components/signup/Signup.component';
import Book from './components/book/Book.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={ Signup } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/dashboard" component={ Dashboard } />
            <Route exact path="/book/:id" component={ Book } />
        </div>
    </ Router>
, document.getElementById('root'));
registerServiceWorker();