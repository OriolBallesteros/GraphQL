import React, { Component } from 'react';
import { graphql } from 'react-apollo';     //--> Used on the export! Allows to use the data from graphql query on the component. 

import { getAuthorsQuery } from './../queries/queries';
/* //query from React front-end
const getAuthorsQuery = gql`                
  {
    authors{
      name
      id
    }
  }
` --> externalized to queries.js*/


class AddBook extends Component {

    displayAuthors() {
        let data = this.props.data;
        if (data.loading) {
            return (<option disabled>Loading authors...</option>);

        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                );
            });
        }
    }

    render() {
        console.log('addbook.js - this.props = ', this.props);
        return (
            <form id='add-book'>
                <div className='field'>
                    <label>Book name:</label>
                    <input type='text' />
                </div>

                <div className='field'>
                    <label>Genre:</label>
                    <input type='text' />
                </div>

                <div className='field'>
                    <label>Author:</label>
                    <select>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
