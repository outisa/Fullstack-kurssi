import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'

const UserForm = (props) => {
  const [username, setUsername] = useState('')
  const [favoriteGenre, setGenre] = useState('')

  const [ create  ] = useMutation(CREATE_USER, {
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message)
    }
  })
 
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault() 
    create({ 
      variables: { favoriteGenre, username }
    })
    props.setPage('login')
    setUsername('')
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Add your favorite genres
          <input
            value={favoriteGenre}
            onChange={({ target }) => setGenre(target.value)}
          />
         </div> 
        <button type='submit'>create user</button>
      </form>
    </div>
  )
}

export default UserForm