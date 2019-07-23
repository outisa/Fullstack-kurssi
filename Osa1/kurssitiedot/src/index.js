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
            <Part parts={props.parts.map(value =>  value.name + ' ' + value.exercises)}/>
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    return (
        <div>
            <p>
                Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
            </p>
        </div>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <div>        
            <p>{props.parts[0]}</p>
            <p>{props.parts[1]}</p>
            <p>{props.parts[2]}</p>        
        </div>
    )
}
const App = () => {
    const course = 'Half Stack application development'
    const parts = [{
        name:'Fundamentals of React',
        exercises: 10,
    },    
    {
        name: 'Using props to pass data',
        exercises: 7,
    },
    {
        name: 'State of a component',
        exercises: 14,
    }] 

    return (
        <div>
            <Header header1={course}/>
            <Content parts={parts}/>
            <Total parts={parts}/>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));

