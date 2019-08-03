import React, { useState } from 'react'

const personsGlobal = [{ name: 'Arto Hellas', number: '040-123456' },
{ name: 'Ada Lovelace', number: '39-44-5323523' },
{ name: 'Dan Abramov', number: '12-43-234345' },
{ name: 'Mary Poppendieck', number: '39-23-6423122' }];

const App = () => {
    const [ persons, setPersons] = useState(personsGlobal) 
    const [ newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('');

    const submit = (event) => {  
        event.preventDefault();
        console.log("Index of:", newName, "=", persons.indexOf(newName))
        if ((persons.map(person => person.name)).indexOf(newName) !== -1) {
          alert(`${newName} is already in the phonebook!`);          
        } else {        
            const person = {
                name:newName,
                number:newNumber
            }
            setPersons(persons.concat(person))
            setNewName('');
            personsGlobal.push(person);
        }
    }

    const nameInputChange = (event) => {
        setNewName(event.target.value);
    }

    const numberInputChange = (event) => {
        setNewNumber(event.target.value);
    }

    const filterInputChange = (event) => {
        if (event.target.value === "") {
            setPersons(personsGlobal);
        } else {
            personsGlobal.forEach(person => {
                console.log("Indexof event target value:", person.name.toLowerCase().indexOf(event.target.value));    
            });
            
            const filtered = personsGlobal.filter(person => person.name.indexOf(event.target.value) !== -1)
            setPersons(filtered);
        }
    }

    return (
      <div>
        <h2>Phonebook</h2>
        <div>Filter shown with <input onChange={filterInputChange}/></div>
        <h2>Add new person into phonebook</h2>
        <form>
          <div>
            name: <input onChange={nameInputChange} value={newName}/>
          </div>
          <div>
            number: <input onChange={numberInputChange} value={newNumber}/>
          </div>
          <div>
            <button type="submit" onClick={submit}>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
            {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
      </div>
    )

}

export default App