import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons)
      )
  }, [])

  if (!persons) {
    return null
  }

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
          setNotificationType("success")
          setNotificationMessage(`Updated ${updatedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationType("error")
          setNotificationMessage(`Information of ${updatedPerson.name} has already been removed from server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
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
        setNotificationType("success")
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
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
      <Notification message={notificationMessage} notificationType={notificationType} />
      <Filter nameFilter={nameFilter} handleFilterChange={e => handleInputChange(e, setNameFilter)} />

      <h3>Add a new</h3>

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={e => handleInputChange(e, setNewName)} handleNumberChange={e => handleInputChange(e, setNewNumber)} />

      <h3>Numbers</h3>

      <Persons persons={persons} nameFilter={nameFilter} handleRemove={handleRemove} />

    </div>
  )
}

export default App
