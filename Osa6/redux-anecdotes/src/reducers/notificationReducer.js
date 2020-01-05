
export const setNotification = (content, time) => {
  const milliSeconds = 1000 * time

  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        data: ''
      })  
    }, milliSeconds);

  }
}

const NotificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      state = action.data
      return state
    case 'HIDE_NOTIFICATION':
      state = action.data
      return state  
    default:
      return state
  }
}

export default NotificationReducer