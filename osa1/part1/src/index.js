import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    {index:0,text:'If it hurts, do it more often', votes:0},
    {index:1,text:'Adding manpower to a late software project makes it later!', votes:0},
    {index:2,text:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes:0},
    {index:3,text:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes:0},
    {index:4,text:'Premature optimization is the root of all evil.', votes:0},
    {index:5,text:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes:0}
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

const Anecdote = (props) => {    
    return (
      <div>
        <div>{props.anecdote.votes.toString()}</div>
        <div>{props.anecdote.text.toString()}</div>
      </div>
    )
}

const MostVotedAnectode = (props) => {
  if (props.anecdote === undefined) return (<div>No voted anectodes yet</div>)
  else return (<div>    
    <div>{props.anecdote.text.toString()}</div>
    <div>has {props.anecdote.votes.toString()} votes</div>
  </div>)
}

function getAnecdote() {
  let rand = Math.random();
  rand = Math.floor(rand * 10)  % anecdotes.length;
  return anecdotes[rand];
}

function setAnecdote(currentAnecdote, anecdoteSetter) {
  let tempAnecdote;
  do {
    tempAnecdote = getAnecdote();
    console.log(tempAnecdote)
  } while (tempAnecdote.text === currentAnecdote.text);
  
  return () => {anecdoteSetter(tempAnecdote);}
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [anecdote, anecdoteSetter] = useState(anecdotes[0]);
  const [mostVotedAnect, setMostVotedAnect] = useState(undefined);
    
  const all = good + neutral + bad;

  const addVote = () => {
    anecdotes[anecdote.index].votes += 1;
    anecdoteSetter({...anecdotes[anecdote.index]});
    let mostVotes = anecdotes[0];
    anecdotes.forEach(element => {
      if (element.votes > mostVotes.votes) mostVotes = element;
    });
    setMostVotedAnect(mostVotes);
  }

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
      <Button text="Next anecdote" click={setAnecdote(anecdote, anecdoteSetter)} />
      <Button text="Vote" click={addVote} />
      <Anecdote anecdote={anecdote}/>
      <h2>Anecdote with most votes</h2>
      <MostVotedAnectode anecdote={mostVotedAnect}/>      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)