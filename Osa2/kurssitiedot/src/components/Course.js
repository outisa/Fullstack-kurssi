import React from 'react'

const Header = ({ header3 }) => {
    console.log({header3})
    return (
        <h3>{header3}</h3>
    )   
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p><strong>Total number of exercises {total}</strong></p>
    ) 
}
  
const Part = ({ parts }) => {
    console.log({ parts })
    return (
        parts
    )    
}

const Content = ({ parts }) => {
    console.log({ parts })
    return (
        <div>
            <Part parts={parts.map(value =>
            <p key={value.id}> {value.name} {value.exercises}</p>)}
            />    
        </div>
    ) 
}

const Course = ({ course }) => {
    return (
        <div>
            <Header header3={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course