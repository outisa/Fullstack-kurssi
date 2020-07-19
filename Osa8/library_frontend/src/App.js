import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'


const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}
const App = () => {
  const [page, setPage] = useState('authors')
  const authorResults = useQuery(ALL_AUTHORS)
  const bookResults =useQuery(ALL_BOOKS)
  const [errorMessage, setErrorMessage] = useState(null)
  
  if (bookResults.loading || authorResults.loading) {
    return <div>loading...</div>
  }
  const notify = (message) => {
    setErrorMessage(message)    
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'} authorResults={authorResults}
      />

      <Books
        show={page === 'books'} bookResults={bookResults}
      />

      <NewBook
        show={page === 'add'} notify={notify}
      />

    </div>
  )
}

export default App