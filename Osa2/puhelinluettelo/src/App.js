import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'
import './index.css'

const Filter = (props) => {
    return (
        <form>
            <div>
                filter shown with: <input 
                value={props.filterData}
                onChange={props.handleFilter}/>
            </div>
        </form>
    )
}
const PersonForm = (props) => {
    return (
        <form onSubmit={props.addName}>
            <div>
                name: <input
                value={props.newName}
                onChange={props.handleNewName}
                />
            </div>                
            <div>
                number: <input 
                value={props.newNumber}
                onChange={props.handleNewNumber}
                />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )    
}

const Persons = (props) => {
    return (
        <ul>{ props.rows }</ul>
    )
}

const Notification = ( { errorMessage, message } ) => {

    if (errorMessage === null & message === null) {
        console.log('??')
        return null
    } else if (message === null) {
        return (
            <div className="error">
                {errorMessage}
            </div>
        )
    } else if (errorMessage === null) {
        return (
            <div className="added">
              {message}
            </div>
        )
    }
    
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)
    const [ newName, SetNewName ] = useState('')
    const [ newNumber, SetNewNumber] = useState('')
    const [ filterData, setFilterData] = useState('')
    const [ showAll, setShowAll] = useState(true)

    useEffect (() => {
        console.log('effect')
        personService
            .getAll()
            .then( initialPersons => {
                console.log('promise fulfilled')
                setPersons(initialPersons)
            })
    }, [])

    
    const showMessage = message => {
        setMessage(`${message}`)
        timeout()  
    }

    const showErrorMessage = errorMessage => {
        setErrorMessage(`${errorMessage}`)
        timeout() 
    }

    const timeout = () => {
        setTimeout(() => {
            setMessage(null)
            setErrorMessage(null)
            }, 3000);
        SetNewName('')
        SetNewNumber('')  
    }

    const addName = (event) => {
        event.preventDefault()
        const isOnList = persons.find(function(element) {
            return element.name === newName
        })
        console.log(isOnList)
        if (typeof isOnList !== 'undefined' && isOnList.name === newName) {
            const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (result) {
                const person = persons.find(p => p.id === isOnList.id)
                const changendPerson = { ...person, number: newNumber}
                personService
                  .update(isOnList.id, changendPerson)
                  .then(updatetPerson => {
                    showMessage(`Number changed for ${newName}`)
                    setPersons(persons.map(person => person.id !== isOnList.id ? person : updatetPerson))
                  })
                  .catch(error => {
                    showErrorMessage(`Information of ${isOnList.name} has already been removed from server.`)
                    setPersons(persons.filter(p => p.id !== isOnList.id))
                })  
            }
        } else {    
            const nameObject = {
                name: newName,
                number: newNumber
            }
            personService
              .create(nameObject)
              .then(returnedNote => {
                showMessage(`Added ${newName}`)  
               setPersons(persons.concat(returnedNote))
               }).catch(response => {
                   console.log(response.data)
                   showErrorMessage('Name or number is missing')
               })
        }    
    }
    
    const removeFromList = (id) => {
        const person = persons.find(n => n.id === id)
        console.log(person)
        const result = window.confirm(`Delete ${person.name} ? `)
        if(result) {
            personService
            .remove(person.id)
            .then(response => {
                showMessage(`${person.name} was deleted from server.`) 
                console.log(response.data)
                setPersons(persons.filter(p => p.id !== person.id))
            })
            .catch(error => {
                showErrorMessage(`${person.name} has already been removed from server.`)
                setPersons(persons.filter(p => p.id !== person.id))
            })
        } 
    }
    const handleNewName = (event) => {
        console.log(event.target.value)
        SetNewName(event.target.value)
    }
    const handleNewNumber = (event) => {
        console.log(event.target.value)
        SetNewNumber(event.target.value)
    }

    const filterPersons = showAll
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filterData.toLowerCase()))

    const rows = () => filterPersons.map(person => 
        <Person 
        key={person.id}
        person={person} 
        removeContact={() => removeFromList(person.id)} 
        />
    )
    const handleFilter = (event) => {
        setFilterData(event.target.value)
        console.log(event.target.value)
        if (event.target.value !== '' && showAll === true) { 
            setShowAll(!showAll)
        } else if (event.target.value === '') {
            setShowAll(showAll)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification errorMessage={errorMessage} message={message}/>
            <Filter filterData={filterData} handleFilter={handleFilter}/>
            <h2>Add a new contact</h2>
            <PersonForm addName={addName} newName={newName}
              handleNewName={handleNewName} newNumber={newNumber}
              handleNewNumber={handleNewNumber}/>
            <h2>Numbers</h2>
            <Persons rows={ rows() }/>
        </div>
    )
}

export default App