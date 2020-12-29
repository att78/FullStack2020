import React from 'react'

const LoginForm = ({ handlePassword, handleName, username, password, handleLogin }) => (
  <div>
    <h3>Please, fill your login credentials</h3>
    <form onSubmit={handleLogin}>
      <div>
        Your username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleName}
        />
      </div>
      <div>
        Your password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)


export default LoginForm