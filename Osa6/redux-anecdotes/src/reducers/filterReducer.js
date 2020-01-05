const filterReducer = (state='', action) => {
  switch (action.type) {
    case 'SEARCH':
      state = action.data
      console.log(state)
      return state
    case 'ALL':
      state = action.data
      return state  
    default:
      return state
  }
}
export const searchBy = (word) =>{
  if ( word === '') {
    return {
      type: 'ALL',
      data: ''
    }
  }
  const content = word.toLowerCase()
  return {
    type: 'SEARCH',
    data: content
  }
}
export default filterReducer