import React from 'react';
import { create, del } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = (props) => {

    const onSubmit = async (event) => {
        event.preventDefault();
        props.create(event.target.createAnecdote.value);
    }

    const onSubmitDel = (event) => {
        event.preventDefault();
        const val = event.target.deleteAnecdote.value;
        anecdoteService.deleteItem(val);
        console.log("Input value:", val);
        props.del(val);
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={onSubmit}>
                <div><input name="createAnecdote" /></div>
                <button>create</button>
            </form>
            <form onSubmit={onSubmitDel}>
                <div><input name="deleteAnecdote" /></div>
                <button>delete</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    create, del
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm