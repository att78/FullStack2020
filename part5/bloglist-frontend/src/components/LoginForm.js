import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handlePassword, handleName, username, password, handleLogin }) => (
  <div>
    <h3>Please, fill your login credentials</h3>
    <form onSubmit={handleLogin}>
      <div>
        Your username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={handleName}
        />
      </div>
      <div>
        Your password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  </div>
)


LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleName: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm