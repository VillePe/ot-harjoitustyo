import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './Person'

const App = (props) => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        console.log("Effect");
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data);
            })
    }, [])

    const rows = () => persons.map(person =>
        <Person
            key={person.id}
            person={person}
        />
    )

    return (
        <div>APP211
            <ul>{rows()}</ul>
        </div>
    )
}

export default App