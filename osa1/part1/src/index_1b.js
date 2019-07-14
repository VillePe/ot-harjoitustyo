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

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    )
}

const Content = (props) => {    
    return (
        <div>
            <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
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
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of a component",
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
