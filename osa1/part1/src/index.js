import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => (
    <button onClick={props.click}>{props.text}</button>
)

const Statistic = (props) => {
    const tdStyle = {
        paddingLeft: "20px"
    }
    return (
        <tr>
            <td >{props.label}</td>
            <td style={tdStyle}>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad    
    if (all <= 0) {
        return (
            <div>No feedback given</div>
        )
    }
    
    return (
      <table>
        <tbody >
            <Statistic label="Good:" value={props.good.toString()} />
            <Statistic label="Neutral:" value={props.neutral.toString()} />
            <Statistic label="Bad:" value={props.bad.toString()} />
            <Statistic label="All:" value={all} />
            <Statistic label="Average:" value={(props.good - props.bad) / all}/>
            <Statistic label="Positive:" value={props.good / all * 100}/>
        </tbody>
      </table>
    )
}

const Anecdote = () => {
    let rand = Math.random();
    rand = Math.floor(rand * 10)  % anecdotes.length;
    return (
        <div>{anecdotes[rand]}</div>
    )


}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
    
  const all = good + neutral + bad;  

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" click={() => setGood(good + 1)} />
        <Button text="Neutral" click={() => setNeutral(neutral + 1)} />
        <Button text="Bad" click={() => setBad(bad + 1)} />
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <h2>Anecdote</h2>
      <Anecdote />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)