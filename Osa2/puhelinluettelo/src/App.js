import React, { useState } from 'react'
import Person from './components/Person'

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
const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Matti Meikalainen', 
          number: '034-06679860',
          id: 1,
        },
        {
            name: 'Ada Lovelace',
            number: '02349134-123',
            id: 2,
        },
        {
            name: 'Outi Savolainen',
            number: '0808022-132-22',
            id: 3,
        },
        {
            name: 'Kvothe, you may know me',
            number: '132',
            id: 4,
        }
    ])
    const [ newName, SetNewName ] = useState('')
    const [ newNumber, SetNewNumber] = useState('')
    const [ filterData, setFilterData] = useState('')
    const [ showAll, setShowAll] = useState('true')
    

    const addName = (event) => {
        event.preventDefault()
        const isOnList = persons.find(function(element) {
            return element.name === newName

        })
        console.log(isOnList)
        if (typeof isOnList !== 'undefined' && isOnList.name === newName) {
            window.alert(`${newName} is already added`)

        } else {
            const nameObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            setPersons(persons.concat(nameObject))
            console.log('add clicked', event.target)
            SetNewName('')
            SetNewNumber('')
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
        <Person key={person.id} person={person} />
    )
    const handleFilter = (event) => {
        setFilterData(event.target.value)
        console.log(event.target.value)
        if (event.target.value !== '' && showAll === 'true') {
            setShowAll(!showAll)
        } else if (event.target.value === '') {
            setShowAll(showAll)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
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