import React from 'react';
import ReactDOM from 'react-dom';

const exercises3 = 14;
const exercises2 = 7;
const exercises = 10;
const course = "Half Stack application development";

const Header = (props) => {    
    return (
        <h1>{props.course}</h1>
    )
}

const Content = () => {
    const part1 = "Fundamentals of React";    
    const part2 = "Using props to pass data";    
    const part3 = "State of a component";    
    return (
        <div>
            <p>
                {part1} {exercises}
            </p>
            <p>
                {part2} {exercises2}
            </p>
            <p>
                {part3} {exercises3}
            </p>
        </div>
    )
}

const Total = () => {
    return (
        <p>
            Number of exercises {exercises + exercises2 + exercises3}
        </p>
    )
}

const App = () => {
    return (
        <div>
            <Header course={course}/>
            <Content />
            <Total />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
