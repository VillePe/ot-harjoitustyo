import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({counter}) => {
    return (
        <div>{counter}</div>
    )
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const History = (props) => {
  
}

const App = (props) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [all, setAll] = useState([]);

  const handleLeftClick = () => {
    setLeft(left + 1);
    setAll(all.concat('L'));
  }
  const handleRightClick = () => {
    setRight(right + 1);
    setAll(all.concat('R'));
  }  

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{all.join(' ')}</p>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)