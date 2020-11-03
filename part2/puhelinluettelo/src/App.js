import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)

    const addNewContact = (event) => {
        event.preventDefault()

        if (persons.every(person => person.name !== newName)) {
            const PersonObject = {
                name: newName,
                number: newNumber,
            }

            personService
                .create(PersonObject)

                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMessage(`A new contact was added to phonebook.`)
                    setTimeout(() => { setNotificationMessage(null) }, 5000)
                })

        } else {
            if (window.confirm(`${newName} is already added to phonebook, would you like to change the number`)) {
                console.log('Change number')
                const updatedContact = persons.find(a => a.name === newName)
                updatedContact.number = newNumber
                personService.update(updatedContact)
                    .then(returnedContact => {
                        setPersons(persons
                            .map(person => person.id !== updatedContact.id ? person : returnedContact))
                        setNewName('')
                        setNewNumber('')
                        setNotificationMessage(`${returnedContact.name} has been changed`)
                        setTimeout(() => { setNotificationMessage(null) }, 5000)
                    })
            }


        }
    }



    useEffect(() => {
        personService
            .getAll()
            .then(response => { setPersons(response.data) })
    }, [])




    const shownContacts = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))



    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)

    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }



    const handleErase = (person) => {
        const contactName = person.name
        if (window.confirm(`Should ${contactName} be erased from the phonebook?`)) {
            eraseContact(person)

        }
    }


    const eraseContact = (person) => {
        personService.erase(person.id)
            .then(response => {
                const updatedContacts = persons.filter(contact => contact.id !== person.id)
                setPersons(updatedContacts)
                setNotificationMessage(`Contact was removed successfully.`)
                setTimeout(() => { setNotificationMessage(null) }, 5000)
            })

    }




    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} />

            <Filter newFilter={newFilter}
                handleFilterChange={handleFilterChange} />



            <h3>Add new contact:</h3>
            <ContactForm addNewContact={addNewContact}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <ContactList persons={shownContacts} handleErase={handleErase} />

        </div>
    )

}

export default App