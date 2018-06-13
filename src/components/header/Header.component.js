import React, { Component } from 'react';
import './Header.css';
import AuthService from '../auth/AuthService';
const Auth = new AuthService();


class App extends Component {
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
 }

  render() {
    return (
      <div>
        <header>  
          <p>Welcome {this.props.name}</p>
          <button type="button" className="btn btn-primary" onClick={this.handleLogout.bind(this)}>Logout</button>
        </header>
      </div>
    );
  }
}

export default App;


