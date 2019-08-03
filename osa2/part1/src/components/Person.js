import React from 'react'

const Person = ({person, delFunc, modifyFunc}) => {
    return (
        <div>
            <li>{person.name} {person.number} <button id={person.id} onClick={delFunc}>Delete</button><button id={person.id.toString()} onClick={modifyFunc}>Modify</button></li>
        </div>
    )
}

export default Person