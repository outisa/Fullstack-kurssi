import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const EditForm = ({ authors, notify }) => {
  const [name, setName] = useState('')
  const [bornYear, setYear] = useState('')
  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
     
    }
  })
  

  const submit = async (event) => {
    event.preventDefault()
    const year = Number(bornYear)
    editAuthor({ variables: { name, year } })
    setYear('')
  }

  return(
    <div>
      <h4>Set birthyear</h4>
      <form onSubmit={submit}>
          name:
          <Select 
              className="react-selectcomponent"
              classNamePrefix="name-select"
              getOptionValue={option => `${option.name}`}
              onChange={(getOptionValue) => setName(getOptionValue.name)}
              getOptionLabel={option =>`${option.name}`}
              options={authors}
              isSearchable={true}
              noOptionsMessage={() => null}
              placeholder={'choose name'}
              autoFocus={true}
          />
        <div>
          born in:
          <input 
            value={bornYear} type='Number' 
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const authors = props.authorResults.data.allAuthors
  console.log(authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      {props.token ? 
      <EditForm authors={authors} notify={props.notify} />
      : null }
    </div>
  )
}

export default Authors
