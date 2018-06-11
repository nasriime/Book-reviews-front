import React, { Component } from 'react';
import withAuth from '../auth/WithAuth';
import AuthService from '../auth/AuthService';
import StarRatingComponent from 'react-star-rating-component';
import { Form, FormGroup,FormControl, ControlLabel, Button ,Col} from 'react-bootstrap';


class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      books:[],
      title:'',
      author: '',
      isbn : 1,
      rating : 1,
      user: localStorage.getItem('id_user')
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

 componentDidMount() {
  this.Auth.getBooks()
  .then(books =>  this.setState({ books: books }) )      
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

handleFormSubmit(e){
    e.preventDefault();
    this.Auth.addBook(this.state.title,this.state.author, this.state.isbn, this.state.rating, this.state.user)
        .then(res =>{
          this.setState({
            books: [...this.state.books, res],
            title:'',
            author: '',
            isbn : 1,
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

  render() {
    const { books, rating, title, author, isbn } = this.state;

    return (
      <div className="container" style={{marginTop: '20px'}}>
        <Form horizontal onSubmit={this.handleFormSubmit}>
          <FormGroup controlId="formHorizontalTitle">
            <Col componentClass={ControlLabel} sm={1}>
               title
            </Col>
            <Col sm={4}>
              <FormControl type="text" 
                placeholder="Title" 
                value={ title }  
                name="title"
                onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalAuthor">
            <Col componentClass={ControlLabel} sm={1}>
              Author
            </Col>
            <Col sm={4}>
              <FormControl type="text" 
                placeholder="Author" 
                value={ author }  
                name="author"
                onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalIsbn">
            <Col componentClass={ControlLabel} sm={1}>
              ISBN
            </Col>
            <Col sm={4}>
              <FormControl type="number" 
                placeholder="ISBN" 
                value={isbn}  
                name="isbn"
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
              <Button type="submit">Add Book</Button>
            </Col>
          </FormGroup>
        </Form>;

          <div className="row">
            { books.map(book =>
              <div className="col-sm-3">
                <div className="card bg-secondary text-white" key={book._id}>
                  <div className="card-header">{book.title}</div>
                  <div className="card-body">
                    <p className="card-text">ISBN : {book.ISBN}.</p>
                    <p className="card-text">Author : {book.author}</p>
                  </div> 
                  <div className="card-footer clearfix"><i className="pull-left">rating : </i>
                    <StarRatingComponent 
                      name="rate2" 
                      editing={false}
                      starCount={5}
                      value={book.rating}
                    />
                  </div>
                </div>
              </div>
            )} 
          </div>
          
             
      </div>
    );
  }


}

export default withAuth(Dashboard);

