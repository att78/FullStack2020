import React from 'react'


const Filter = (props) => {
    return (
        <div>
            Filter countries with: <input value={props.filter} onChange={props.handleFilterChange} />
        </div>
    )
}

export default Filter