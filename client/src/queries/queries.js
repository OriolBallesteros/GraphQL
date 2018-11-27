import { gql } from 'apollo-boost';         //--> allows to create the query

//queries from React front-end
const getBooksQuery = gql`                
  {
    books{
      name
      id
    }
  }
`

const getAuthorsQuery = gql`                
  {
    authors{
      name
      id
    }
  }
`

//using query variables
const addBookMutation = gql`
mutation($name:String!, $genre:String!, $authorId:ID!){   
  addBook(name: $name, genre: $genre, authorId: $authorId){
    name
    id
  }
}
`
/* while building addBookMutation:
const addBookMutation = gql`
mutation{
  addBook(name: "", genre: "", authorId: ""){
    name
    id
  }
}
` */

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation
}