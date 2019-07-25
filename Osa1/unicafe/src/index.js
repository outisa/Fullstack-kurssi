import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => {
    return (
        <div>
            <h2>{text}</h2>
        </div>
    )
}

const Button = ({ handler, text }) => {
    return (
        <button onClick={handler}>{text}</button>
    )
}

const Statistics = (props) => {
    if (props.total === 0) {
        return (
            <div>
                No feedback given.
            </div>
        )
    } 
    return (
        
        <table>
            <tbody>
                <Statistic text='good' value={props.good} />
                <Statistic text='neutral' value={props.neutral} />
                <Statistic text='bad' value={props.bad} />
                <Statistic text='all' value={props.total} />
                <Statistic text='average' value={props.average} />
                <Statistic text='positive' value={props.positive + ' %'} />
            </tbody>
        </table>
        
    )    
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td> 
            <td>{props.value}</td>
        </tr>
    )
}
const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [value, setValue] = useState(0)
    

    const handleClickGood = () => {
        setGood(good + 1)
        setTotal(total + 1)
        setValue(value + 1)
    }

    const handleClickNeutral = () => {
        setNeutral(neutral + 1)
        setTotal(total + 1)
        setValue(value + 0)
    }

    const handleClickBad = () => {
        setBad(bad + 1)
        setTotal(total + 1)
        setValue(value - 1)
    }

    return (
        <div>
            <Header text='Give feedback'/>
            <Button handler={handleClickGood} text='good'/>
            <Button handler={handleClickNeutral} text='neutral'/>
            <Button handler={handleClickBad} text='bad'/>
            <Header text='Statistics'/>
            <Statistics 
                good={good} neutral={neutral}
                bad={bad} total={total} 
                average={value/total} positive={100 * good/total}  
            />   
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
