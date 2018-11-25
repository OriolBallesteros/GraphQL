import React, { Component } from 'react';
import { graphql } from 'react-apollo';     //--> Used on the export! Allows to use the data from graphql query on the component. 

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

  displayBooks() {
    let data = this.props.data;
    if (data.loading) {
      return (<div>Loading books...</div>);

    }else{
      return data.books.map(book => {
        return (
          <li key={book.id}>{book.name}</li>
        )
      });

    }
  }

  render() {
    console.log('booklist.js -- this.props = ', this.props); //--> storage of data from DDBB
    return (
      <div>
        <ul id='book-list'>
          {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

