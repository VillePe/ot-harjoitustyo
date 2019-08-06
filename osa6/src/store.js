import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducers = combineReducers({ anecdotes: anecdoteReducer, notification: notificationReducer })
const store = createStore(reducers, applyMiddleware(thunk));

export default store;