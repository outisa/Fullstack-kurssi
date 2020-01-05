import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  const voteOf = (anecdote) => {
    props.vote(props.allAnecdotes, anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }
  return(
    <div>
      <h3>list of added anecdotes</h3>
      {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteOf(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ filter, anecdotes }) => {
  if (filter === '') {
    return anecdotes
  } 
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    visibleAnecdotes: anecdotesToShow(state),
    allAnecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  vote,
  setNotification,
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)