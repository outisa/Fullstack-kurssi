import { gql } from '@apollo/client'

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      name
    }
    title
    published
    id
  } 
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const ALL_BOOKS_GENRE = gql`
  query getByGenre($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`
export const CREATE_USER = gql`
  mutation create($favoriteGenre: String!, $username: String!){
    createUser(
      username: $username,
      favoriteGenre: $favoriteGenre
    ) {
    username
    favoriteGenre
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
      author {
        name
      }
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
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const GENRES = gql`
  query {
    genres {
      genre
    }
  }
`