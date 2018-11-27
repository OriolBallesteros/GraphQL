import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';     //--> Used on the export! Allows to use the data from graphql query on the component. 

import { getAuthorsQuery, addBookMutation, getBooksQuery} from './../queries/queries';
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

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        };
    }

    displayAuthors() {
        //let data = this.props.data; --> ONCE we use compose to use more than 1 query in a component, the structure of this.props changes and this.props.data do not longer exist
        console.log(this.props);
        let data = this.props.getAuthorsQuery;
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

    submitForm(e){
        e.preventDefault();
        //console.log(this.state);
        this.props.addBookMutation({        //--> working with the query variables in queries line 23
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    render() {
        //console.log('addbook.js - this.props = ', this.props);
        return (
            <form id='add-book' onSubmit={this.submitForm.bind(this)}>
                <div className='field'>
                    <label>Book name:</label>
                    <input type='text' onChange={(e) => this.setState({ name: e.target.value })} />
                </div>

                <div className='field'>
                    <label>Genre:</label>
                    <input type='text' onChange={(e) => this.setState({ genre: e.target.value })}/>
                </div>

                <div className='field'>
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
