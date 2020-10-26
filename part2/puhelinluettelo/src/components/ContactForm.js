import React from 'react'

const ContactForm = (props) => {

    return (

        <form onSubmit={props.addNewContact}>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>

            <div>
                <p></p>
                <button type="submit">Add to the Phonebook</button>
            </div>

        </form>




    )


}


export default ContactForm 
