import React from 'react'
import Person from '../components/Person'

const ContactList = ({ persons, handleErase }) => {

    const list = persons

    const contacts = () => list.map(person => <Person key={person.name} name={person.name} person={person} number={person.number} handleErase={handleErase} />)

    return (
        <div>
            {contacts()}
        </div>

    )

}



export default ContactList