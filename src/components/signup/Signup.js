import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';


class Signup extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.Auth = new AuthService();
    }

  formSubmit(e){
    e.preventDefault();

    this.Auth.signup(this.state.username,this.state.password)
        .then(res =>{
            this.props.history.replace('/login');
        })
        .catch(err =>{
            alert(err);
        })
}


handleChange(e){
    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
}


render() {
  return (
    <div className="center">
              <div className="card">
                  <h1>Sign up</h1>
                  <form onSubmit={this.formSubmit}>
                      <input
                          className="form-item"
                          placeholder="Username"
                          name="username"
                          type="text"
                          onChange={this.handleChange}
                      />
                      <input
                          className="form-item"
                          placeholder="Password"
                          name="password"
                          type="password"
                          onChange={this.handleChange}
                      />
                      <input
                          className="form-submit"
                          value="Rigester"
                          type="submit"
                      />
                  </form>
              </div>
              <p>Already have an account ? <Link to={'/login'}>login</Link></p>
          </div>
  );
}

}

export default Signup;



