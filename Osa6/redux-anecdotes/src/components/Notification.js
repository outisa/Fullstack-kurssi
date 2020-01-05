import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const showNotification = () => {
    console.log(props.notification)
    if (props.notification === '' ) {
      return true
    }
    return false
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    showNotification() ? null :
    <div style={style}>
      {props.notification}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}
export default connect(mapStateToProps)(Notification)