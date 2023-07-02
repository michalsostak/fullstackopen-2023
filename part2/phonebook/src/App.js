import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const handleInputChange = (e, f) => {
    f(e.target.value)
  }

  const addName = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(elem => elem.name === newPerson.name)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    if (newName === '') {
      alert("Cannot add an empty name")
      return
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter nameFilter={nameFilter} handleFilterChange={e => handleInputChange(e, setNameFilter)} />

      <h3>Add a new</h3>

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={e => handleInputChange(e, setNewName)} handleNumberChange={e => handleInputChange(e, setNewNumber)} />

      <h3>Numbers</h3>

      <Persons persons={persons} nameFilter={nameFilter} />

    </div>
  )
}

export default App
