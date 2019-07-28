import React from 'react'

const Person = ({person, delFunc}) => {
    return (
        <div>
            <li>{person.name} {person.number} <button id={person.id} onClick={delFunc}>Delete</button></li>
        </div>
    )
}

export default Person