import React from 'react'

const ContactForm = (props) => {

    return (

        <form onSubmit={props.addNewContact}>
            <div>
                nimi: <input value={props.newName} onChange={props.handleNameChange} />
            </div>

            <div>
                <p></p>
                <button type="submit">Add to the Phonebook</button>
            </div>

        </form>




    )


}


export default ContactForm 
