import React from 'react'

const Notification = ({ message }) => {
    const nstyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }


    if (message === null) {
        return (
            <div style={nstyle}
            ></div>
        )
    }

    return (
        <div className="error" style={nstyle}>
            {message}
        </div>
    )
}

export default Notification