import React, { Component } from 'react';
import withAuth from '../auth/WithAuth';
import AuthService from '../auth/AuthService';
import StarRatingComponent from 'react-star-rating-component';


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
          <div key={book.id}>
            <div>{book.title}</div> 
            <div>{book.ISBN}</div> 
            <div>{book.author}</div> 
            <StarRatingComponent 
              name="rate2" 
              editing={false}
              starCount={5}
              value={book.rating}
            />
          </div>
        )}      
      </div>
    );
  }


}

export default withAuth(Dashboard);

