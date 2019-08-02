import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './Person'

const database = "/api/persons";

const App = (props) => {
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState([]);

    useEffect(() => {
        axios
            .get(database)
            .then(response => {
                setPersons(response.data);
            })
    }, [])

    const delPerson = (event) => {
        const id = event.target.id;
        console.log("To be deleted...", id);
        axios.delete(`${database}/${id}`).then(response => {            
            setPersons(persons.filter(p => p.id !== parseInt(id)));
            console.log(id, "deleted!");
        })
    }

    const rows = () => persons.map(person =>
        <Person
            key={person.id}
            person={person}
            delFunc={delPerson}
        />
    )

    const addPerson = () => {        
        console.log(newPerson);
        axios.post(database, newPerson).then(response => {
            console.log(response.data)
            setPersons(persons.concat(response.data));
        })
    }

    const onNewPersonNameChange = (event) => {
        setNewPerson({name:event.target.value, number:newPerson.number});
    }
    const onNewPersonNumberChange = (event) => {
        setNewPerson({name:newPerson.name, number:event.target.value});
    }

    const filterOnChange = (event) => {
        const value = event.target.value;
        axios
            .get(database)
            .then(response => {
                console.log(value);
                setPersons(response.data.filter(p => p.name.toUpperCase().includes(value.toUpperCase())))
            })
    }

    return (
        <div>APP215
            <h1>Phonebook</h1>
            <div>Filter shown with <input onChange={filterOnChange} /></div>
            <h2>Add new</h2>
            <div>Name <input onChange={onNewPersonNameChange} /></div>
            <div>Number <input onChange={onNewPersonNumberChange}/></div>
            <div><button onClick={addPerson}>Add</button></div>
            <h2>Numbers</h2>
            <ul>{rows()}</ul>
        </div>
    )
}

export default App