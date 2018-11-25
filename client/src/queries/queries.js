import { gql } from 'apollo-boost';         //--> allows to create the query

//query from React front-end
const getBooksQuery = gql`                
  {
    books{
      name
      id
    }
  }
`

//query from React front-end
const getAuthorsQuery = gql`                
  {
    authors{
      name
      id
    }
  }
`

export {
    getAuthorsQuery,
    getBooksQuery
}