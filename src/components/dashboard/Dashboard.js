import React, { Component } from 'react';
import withAuth from '../auth/WithAuth';
import AuthService from '../auth/AuthService';


class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      books:[]
    };
    this.Auth = new AuthService();
  }

 componentDidMount() {
  this.Auth.getBooks()
  .then(books =>  this.setState({ books: books }))      
  }

  render() {
    return (
      <div className="App">
        {this.state.books.map(book =>
          <ul key={book.id}>
            <li>{book.title}</li> 
            <li>{book.ISBN}</li> 
            <li>{book.author}</li> 
            <li>{book.rating}</li>
          </ul>
        )}      
      </div>
    );
  }


}

export default withAuth(Dashboard);

