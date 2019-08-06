import React from 'react';
import { create } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const onSubmit = (event) => {
        event.preventDefault();
        const val = event.target.createAnecdote.value;
        console.log("Input value:", val);
        props.create(val);
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={onSubmit}>
                <div><input name="createAnecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapStateTo = (state) => {
    return {
        // anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    create
}

const ConnectedAnecdoteForm = connect(mapStateTo, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm