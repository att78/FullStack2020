import React from 'react'

const Person = (props) => {
    return (
        <li>
            {props.name} {props.number}
            <button onClick={() => props.handleErase(props.person)}>
                Erase
            </button>

        </li>
    )
}

export default Person