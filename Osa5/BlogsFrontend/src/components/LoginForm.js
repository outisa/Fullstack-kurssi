import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password}) => {
  return (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input {...username} reset='' id="username"/>
      </div>
      <div>
        Password:
        <input {...password} reset='' id="password"/>
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  </div>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}
export default LoginForm