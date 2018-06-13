import React, { Component } from 'react';
import withAuth from '../auth/WithAuth';
import AuthService from '../auth/AuthService';
import StarRatingComponent from 'react-star-rating-component';
import Header from '../header/Header.component';
import { Form, FormGroup,FormControl, ControlLabel, Button ,Col} from 'react-bootstrap';


class Book extends Component {
  constructor(){
    super();
    this.state = {
      book:{},
      reviews:[],
      textReview:'',
      rating: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

    componentDidMount() {
        this.Auth.getBook(this.props.id)
        .then(book =>  this.setState({ book: book }) );
        
        this.Auth.getBookReviews(this.props.id)
        .then(reviews => this.setState({reviews: reviews}) );
    }

    handleFormSubmit(e){
        e.preventDefault();
        this.Auth.addReview(this.state.textReview,this.state.rating, this.props.id, this.props.user.user._id)
            .then(res =>{
                res = {...res,user: {userName : this.props.user.user.userName}};
                this.setState({
                    reviews: [...this.state.reviews, res],
                    textReview:'',
                    rating : 1
                })        
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
    
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
      }

  render() {
    const { book, reviews ,textReview, rating} = this.state;

    return (
        <div>
            <Header history={this.props.history} name={this.props.user.user.userName}/>
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
                <Form horizontal onSubmit={this.handleFormSubmit}>
                    <FormGroup controlId="formHorizontalTitle">
                        <Col componentClass={ControlLabel} sm={1}>
                        title
                        </Col>
                        <Col sm={4}>
                        <FormControl type="text" 
                            placeholder="Add review" 
                            value={ textReview }  
                            name="textReview"
                            onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalRating">
                        <Col componentClass={ControlLabel} sm={1}>
                        Rating
                        </Col>
                        <Col sm={4}>
                        <StarRatingComponent 
                            name="rate1" 
                            starCount={5}
                            value={rating}
                            onStarClick={this.onStarClick.bind(this)}
                        /> 
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                        <Button type="submit">Add Review</Button>
                        </Col>
                    </FormGroup>
                </Form>;
                
                
                { reviews.map(review =>
                    <div className="row" key={review._id}>
                        <div className="col-md-3">
                            <div className="well">
                                <div>Reviewed By:{review.user.userName}</div>
                                <div>{review.textReview}</div>
                                <div> 
                                    <StarRatingComponent 
                                    name="rate2" 
                                    editing={false}
                                    starCount={5}
                                    value={review.rating}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
               
            </div>
      </div>
    );
  }

}

export default withAuth(Book);
