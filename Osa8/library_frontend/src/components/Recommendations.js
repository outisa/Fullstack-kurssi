import React, {useEffect, useState} from 'react'
import { ALL_BOOKS_GENRE, ME } from '../queries'
import {  useLazyQuery, useQuery } from '@apollo/client'

const Recommendations = ({ show, token }) => {
  const [getByGenre, resultBooks] = useLazyQuery(ALL_BOOKS_GENRE) 
  const [filtered, setFiltered] = useState([])
  const resultMe = useQuery(ME, {
    pollInterval: 3000,
  })


  useEffect(() => {
    console.log(resultMe)
    if(resultMe.data) {
      const user2 = resultMe.data.me
      if (user2){
        console.log(user2)
        getByGenre({ variables: { genre: user2.favoriteGenre }})
      }
    }
  }, [resultMe]) // eslint-disable-line 

  useEffect(() => {
    if(resultBooks.data) {
      console.log(resultBooks.data)
      const filteredBooks = resultBooks.data.allBooks
      setFiltered(filteredBooks)
    } else {
      setFiltered([])
    }
  }, [resultBooks])

  if (resultMe.loading) {
    return <div></div>
  }
  if (!show) {
    return null
  }

  return(
    <div>
      <h2>Your recommendations</h2>
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
    </div>
  )
}

export default Recommendations