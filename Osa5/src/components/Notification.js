import React from 'react'
import '../index.css';

const Notification = ( { message, errorMessage } ) => {
  if (errorMessage !== '') {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  } else if (message !== '') {
    return (
      <div className="added">
        {message}
      </div>
    )
  }
  return null
  
}

export default Notification