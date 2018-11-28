import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from './../queries/queries';


class BookDetails extends Component {

    displayBookDetails(){
        const { book } = this.props.data; // == const book = this.props.data.book;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>Other books by this author:</p>
                    <ul className="other-books">
                        {book.author.booksList.map(item => {
                            return <li key={item.id}> {item.name} </li>
                        })
                        }
                    </ul>
                </div>
            )
        }else{
            return (
                <div>No books selected</div>
            )
        }
    }

    render() {

        //console.log(this.props);
        return (
            <div id="book-details">
                {this.displayBookDetails()}
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {               //--> we do set here the $id of the query. It's taken through props = setState on BookList.js, passes it via props
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);