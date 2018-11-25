import React, { Component } from 'react';
import { gql } from 'apollo-boost';         //--> allows to create the query
import { graphql } from 'react-apollo';     //--> Used on the export! Allows to use the data from graphql query on the component. 

//query from React front-end
const getBooksQuery = gql`                
  {
    books{
      name
      id
    }
  }
`

class BookList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ul id='book-list'>
          <li>Book name</li>
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
//export default BookList;
