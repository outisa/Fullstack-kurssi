import React, { useState }from 'react';
import ReactDOM from 'react-dom';

const Button = ( {handler, text}) => {
    return (
        <button onClick={handler}>{text}</button>
    )
}
const Header = ( { text } ) => (
    <h1>{text}</h1>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(6).fill(0))
    const [mostPopular, setMostPopular] = useState(0)
    
    const nextAnecdoteClicked = () => {
        const min = 0
        const max = 6
        setSelected(Math.floor(Math.random() * (+max - +min)) + +min)    

    }

    const voteClicked = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
        if (copy[mostPopular] < copy[selected]) {
            setMostPopular(selected)
        }
        

    }

    return (
        <div>
            <Header text='Anecdote of the day'/>
            {props.anecdotes[selected]}
            <p>This anecdote has {votes[selected]} votes.</p>
            <Button handler={voteClicked} text='vote'/>
            <Button handler={nextAnecdoteClicked} text='next anecdote'/>
            <Header text='Anecdote with most votes' />
            {props.anecdotes[mostPopular]}
        </div>

    )
}

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to late software project makes it later',
    'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

