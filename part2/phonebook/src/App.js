import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => { personsService.getAll().then(initialPersons => setPersons(initialPersons)) }, [])

  const handleInputChange = (e, f) => {
    f(e.target.value)
  }

  const addName = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(elem => elem.name === newName)
    
    if (existingPerson !== undefined) {
      if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        return
      }
      const updatedPerson = { ...existingPerson, number: newNumber }
      personsService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : updatedPerson))
        })
      return
    }

    if (newName === '') {
      alert("Cannot add an empty name")
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleRemove = (e, id) => {
    if (window.confirm("Do you really want to remove this contact?")) {
      personsService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter nameFilter={nameFilter} handleFilterChange={e => handleInputChange(e, setNameFilter)} />

      <h3>Add a new</h3>

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={e => handleInputChange(e, setNewName)} handleNumberChange={e => handleInputChange(e, setNewNumber)} />

      <h3>Numbers</h3>

      <Persons persons={persons} nameFilter={nameFilter} handleRemove={handleRemove} />

    </div>
  )
}

export default App
