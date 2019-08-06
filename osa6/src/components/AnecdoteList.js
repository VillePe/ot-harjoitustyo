import React from 'react'
import {create, vote} from '../reducers/anecdoteReducer'
import {clear} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const AnecdoteList = (props) => {
    const store = props.store;
    const anecdotes = props.anecdotes
    
    const lVote = (id) => {
        console.log('vote', id)
        props.vote(id)
        setTimeout(() => {
            props.clear();
        },3000)
    }

    return (
        <div>
        {anecdotes.sort((a,b) => {return b.votes-a.votes}).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => lVote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

const mapStateTo = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    vote, clear, create
}

const ConnectedAnecdoteLists = connect(mapStateTo, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteLists;