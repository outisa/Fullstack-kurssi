import React, { useState, useEffect } from 'react'
import { ALL_BOOKS_GENRE } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const [ getByGenre, result ] = useLazyQuery(ALL_BOOKS_GENRE)
  const [ filtered, setFiltered ] = useState(result.data)
  
  useEffect(() => {
    if (result.data) { 
      setFiltered(result.data.allBooks)
    }
  }, [result])

  const filterBooks = (genre) => {
    getByGenre({ variables: { genre: genre} })
  }
  if (!props.show) {
    return null
  }
  if (filtered) {
    return (
      <div>
      <h2>books</h2>
          <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>          
          
          {filtered.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
                  
        </tbody>
      </table>
      <div>
        <button onClick={() => setFiltered(null)}>all</button>
      </div>
    </div>
    )
  }
  const books = props.bookResults.data.allBooks
  const genres = props.genresResult.data.genres

  return (
    <div>
      <h2>books</h2>
          <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>          
          
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
                  
        </tbody>
         </table>
      
      <div>
       {genres.map(genre => 
         <button key={genre.genre} onClick={() => filterBooks(genre.genre)}>{genre.genre}</button>
       )}
       <button onClick={() => setFiltered([])}>all</button>
      </div>
    </div>
  )
}

export default Books