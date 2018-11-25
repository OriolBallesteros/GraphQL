import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';


//apollo client setup
const client = new ApolloClient({       //--> we need to provide the endpoint - then wrap the App with ApolloProvider passing the client
  uri: 'http://localhost:4000/graphql'
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading list</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
