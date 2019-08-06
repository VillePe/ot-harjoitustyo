import React, {useEffect} from 'react';
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from './components/Notification'
import {connect} from 'react-redux'
import {init} from './reducers/anecdoteReducer'

const App = (props) => {

    useEffect(() => {
        props.init()
    },[])

    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <AnecdoteList />            
            <AnecdoteForm />
        </div>
    )
}

export default connect(null, {init})(App)