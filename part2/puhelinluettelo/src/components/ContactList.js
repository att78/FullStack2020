import React from 'react'
import Person from '../components/Person'

const ContactList = ({ persons }) => {

    const list = persons

    const contacts = () => list.map(person => <Person key={person.name} name={person.name} />)

    return (
        <div>
            {contacts()}
        </div>

    )

}



export default ContactList