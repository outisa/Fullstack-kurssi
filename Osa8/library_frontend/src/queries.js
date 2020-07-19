import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      title
      published
      id
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook($author: String!, $genres: [String!]!, $published: Int!, $title: String!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      id
      genres
    }
  }
`
export const EDIT_AUTHOR = gql` 
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $year
    ) {
      name,
      born,
      id
    }
  }
`