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
            setPersons(persons.filter(p => p.id !== id));
            console.log(id, "deleted!");
        })
    }

    const modifyPerson = (event) => {
        const id = event.target.id;
        const person = persons.find(p => p.id.toString() === id);
        console.log(person);
        axios.put(`${database}/${id}`, person).then(response => {
            console.log("Response", response.data);
            setPersons(persons.map(p => p.id !== id ? p : response.data))
        });
    }

    const rows = () => persons.map(person =>
        <Person
            key={person.id}
            person={person}
            delFunc={delPerson}
            modifyFunc={modifyPerson}
        />
    )

    const addPerson = () => {
        console.log(newPerson);
        axios.get(database).then(response => {
            const person = response.data.find(p => p.name === newPerson.name);
            if (person) {
                // If the person is already in the database, change the number for them
                axios.put(`${database}/${person.id}`, newPerson).then(putResponse => {
                    console.log(response.data);
                    setPersons(persons.map(p => {
                        return p.id !== putResponse.data.id ? p : putResponse.data
                    }));
                })                
            } else {
                // If person is not in database, add a new one
                axios.post(database, newPerson).then(postResponse => {
                    console.log(postResponse.data)
                    setPersons(persons.concat(postResponse.data));
                })
            }
        })
    }

    const onNewPersonNameChange = (event) => {
        setNewPerson({ name: event.target.value, number: newPerson.number });
    }
    const onNewPersonNumberChange = (event) => {
        setNewPerson({ name: newPerson.name, number: event.target.value });
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
            <div>Number <input onChange={onNewPersonNumberChange} /></div>
            <div><button onClick={addPerson}>Add</button></div>
            <h2>Numbers</h2>
            <ul>{rows()}</ul>
        </div>
    )
}

export default App