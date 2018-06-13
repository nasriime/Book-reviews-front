import React, { Component } from 'react';
import withAuth from '../auth/WithAuth';
import AuthService from '../auth/AuthService';
import StarRatingComponent from 'react-star-rating-component';


class Book extends Component {
  constructor(){
    super();
    this.state = {
      book:{},
      reviews:[]
    };
    this.Auth = new AuthService();
  }

    componentDidMount() {
        this.Auth.getBook(this.props.id)
        .then(book =>  this.setState({ book: book }) );
        
        this.Auth.getBookReviews(this.props.id)
        .then(reviews => this.setState({reviews: reviews}) );
    }

  render() {
    const { book, reviews } = this.state;

    return (
      <div className="container" style={{marginTop: '20px'}}>
        <div className="row">
            <div className="col-sm-3">
                <div className="card bg-secondary text-white">
                    <div className="card-header">{book.title}</div>
                    <div className="card-body">
                        <p className="card-text">ISBN : {book.ISBN}.</p>
                        <p className="card-text">Author : {book.author}</p>
                    </div> 
                    <div className="card-footer clearfix">
                        <i className="pull-left">rating : </i>
                        <StarRatingComponent 
                            name="rate2" 
                            editing={false}
                            starCount={5}
                            value={book.rating}
                        />
                    </div>
                </div>
            </div>
        </div> 
        <div className="row">
            { reviews.map(review =>
                <div  key={review._id}>
                    <div>{review.textReview}</div>
                    <div>{review.rating}</div>
                    <div>{review.user.userName}</div>
                </div>
            )}
        </div>
      </div>
    );
  }

}

export default withAuth(Book);
