import React, { Component } from 'react';
import { graphql } from 'react-apollo';     //--> Used on the export! Allows to use the data from graphql query on the component. 

import BookDetails from './BookDetails';
import {getBooksQuery} from './../queries/queries';
//query from React front-end
/* const getBooksQuery = gql`                
  {
    books{
      name
      id
    }
  }
` --> externalized to queries.js*/

class BookList extends Component {

  constructor(props){
    super(props);
      this.state = {
        selected: null
      }
  }

  displayBooks() {
    let data = this.props.data;
    if (data.loading) {
      return (<div>Loading books...</div>);

    }else{
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={(e) => {this.setState({selected: book.id})}}>{book.name}</li>
        )
      });

    }
  }

  render() {
    //console.log('booklist.js -- this.props = ', this.props); //--> storage of data from DDBB
    return (
      <div>
        <ul id='book-list'>
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

