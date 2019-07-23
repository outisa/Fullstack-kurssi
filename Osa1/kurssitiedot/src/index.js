import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.header1}</h1>
        </div>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <div>
            <Part name={props.name1} amount={props.amount1}/>
            <Part name={props.name2} amount={props.amount2}/>
            <Part name={props.name3} amount={props.amount3}/>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>
                Number of exercises {props.total}
            </p>
        </div>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <div>
            <p>{props.name} {props.amount}</p>
        </div>
    )
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name:'Fundamentals of React',
        exercises: 10,
    }    
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7,
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14,
    }    
    return (
        <div>
            <Header header1={course}/>
            <Content name1={part1.name} amount1={part1.exercises} 
                name2={part2.name} amount2={part2.exercises} 
                name3={part3.name} amount3={part3.exercises} />
            <Total total={part1.exercises + part2.exercises + part3.exercises}/>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));

