import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }])
    const [newName, setNewName] = useState('')



    const addNewContact = (event) => {
        event.preventDefault()

        if (persons.every(person => person.name !== newName)) {
            const PersonObject = {
                name: newName,
            }
            setPersons(persons.concat(PersonObject))
        } else {
            window.alert(`${newName} is already added to phonebook`)
        }
        setNewName('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }



    return (
        <div>
            <h2>Phonebook</h2>

            <h3>Add new contact:</h3>
            <ContactForm addNewContact={addNewContact}
                newName={newName}
                handleNameChange={handleNameChange}
            />

            <h2>Numbers</h2>
            <ContactList persons={persons} />

        </div>
    )

}


ReactDOM.render(<App />, document.getElementById('root'))

