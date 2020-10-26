import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Filter from './components/Filter'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const shownContacts = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    const addNewContact = (event) => {
        event.preventDefault()

        if (persons.every(person => person.name !== newName)) {
            const PersonObject = {
                name: newName,
                number: newNumber,
            }
            setPersons(persons.concat(PersonObject))
        } else {
            window.alert(`${newName} is already added to phonebook`)
        }
        setNewName('')
        setNewNumber('')
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)

    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }



    return (
        <div>
            <h2>Phonebook</h2>


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
            <ContactList persons={shownContacts} />

        </div>
    )

}


ReactDOM.render(<App />, document.getElementById('root'))

