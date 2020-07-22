import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import UserForm from './components/UserForm'
import Recommendations from './components/Recommendations'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, GENRES, BOOK_ADDED } from './queries'

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
  const bookResults = useQuery(ALL_BOOKS)
  const genresResult = useQuery(GENRES)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('libraryAppUserToken'))
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)    
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set, object) =>
      set.map(book => book.id).includes(object.id)
    
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, bookAdded)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(bookAdded)}
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      const message= `A book ${bookAdded.title} by ${bookAdded.author.name} was added`
      window.alert(message)
      updateCacheWith(bookAdded)
    }
  })

  if (bookResults.loading || authorResults.loading  || genresResult.loading) {
    return <div>loading...</div>
  }

  const logout = ( event ) => {
    event.preventDefault()
    setToken(null)
    localStorage.clear()
    //Tärkeää!
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null }
        {token? null: <button onClick={() => setPage('login')}>login</button> }
        {token? <button onClick={logout}>logout</button> : null}
        {token? <button onClick={() => setPage('recommendations')}>My recommendations</button> : null}
        {token? null:  <button onClick={() =>  setPage('signup')}>sign up</button> }
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'} authorResults={authorResults} notify={notify} token={token}
      />

      <Books
        show={page === 'books'} bookResults={bookResults} genresResult={genresResult}
      />
      {token? <NewBook
        show={page === 'add'} notify={notify} updateCacheWith={updateCacheWith}
      /> : null }
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
      <UserForm show={page === 'signup'} notify={notify} setPage={setPage} />
      <Recommendations  show={page === 'recommendations'} token={token} />
    </div>
  )
}

export default App