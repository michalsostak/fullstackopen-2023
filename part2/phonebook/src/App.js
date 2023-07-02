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
  const [personsFiltered, setPersonsFiltered] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonsFiltered(response.data)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    const lookupValue = e.target.value
    setNameFilter(lookupValue)
    setPersonsFiltered(persons.filter(person => person.name.toLowerCase().includes(lookupValue.toLowerCase())))
  }

  const addName = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(elem => elem.name === personObject.name)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    if (newName === '') {
      alert("Cannot add an empty name")
      return
    }
    setPersons(persons.concat(personObject))
    setPersonsFiltered(personsFiltered.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons personsFiltered={personsFiltered} />

    </div>
  )
}

export default App
