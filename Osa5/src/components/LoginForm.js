import React from 'react'

const LoginForm = ({ handleLogin, username, onChange1, password, onChange2 }) => (
  <form onSubmit={handleLogin}>
    <div>
      Username:
        <input
        type="text"
        value={username}
        name="Username"
        onChange={onChange1}
        />
    </div>
    <div>
      Password:
      <input
      type="password"
      value={password}
      name="Password"
      onChange={onChange2}  
      />
    </div>
    <button type="submit">login</button>
  </form>
)
export default LoginForm