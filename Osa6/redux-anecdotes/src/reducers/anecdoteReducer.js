import anecdoteService from '../services/anecdotes'

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })  
  }  
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const vote = (anecdotes, id) => {
  const anecdoteToChange = anecdotes.find(a => a.id === id)
  console.log('this anecdote is about to change', anecdoteToChange)
  return async dispatch => {
    const changedAnecdote = await anecdoteService.updateVotes(anecdoteToChange)
    const anecdotesList = anecdotes.map(anecdote =>
      anecdote.id !== id ? anecdote : changedAnecdote
    )
    const sortedAnecdotes = anecdotesList.sort((a,b) => b.votes-a.votes)
    dispatch({
      type: 'INCREASE_VOTES',
      data: sortedAnecdotes
    })
  }
}
const reducer = ( state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'INCREASE_VOTES':
      return action.data
    default:
      return state  
  }
}

export default reducer