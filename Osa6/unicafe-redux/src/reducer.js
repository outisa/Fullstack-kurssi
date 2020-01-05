const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changeGood = {
        ...state,
        good: state.good +1
      }
      state = changeGood
      return state
    case 'OK':
      const changeOk = {
        ...state,
        ok: state.ok +1
      }
      state = changeOk
      return state
    case 'BAD':
      const changeBad = {
        ...state,
        bad: state.bad +1
      }
      state = changeBad
      return state
    case 'ZERO':      
    state = initialState
      return state
    default: return state
  }
  
}

export default counterReducer