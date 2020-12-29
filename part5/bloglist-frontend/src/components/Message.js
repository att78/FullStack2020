import React from 'react'

const Message = ({ notification }) => {
  if (notification !== null) {
    return (
      <p>{notification}</p>
    )
  }
  return null
}

export default Message