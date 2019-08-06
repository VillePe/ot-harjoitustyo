import anecdoteService from '../services/anecdote'

export const create = (content) => {
    return async dispatch => {
        const result = await anecdoteService.createNew({ content: content, votes: 0 })
        dispatch({
            type: "CREATE",
            data: result
        })
    }
}

export const vote = (obj) => {
    return async dispatch => {
        const tempAn = { ...obj, votes: obj.votes + 1 }
        const result = await anecdoteService.update(obj.id, tempAn)
        dispatch({
            type: "VOTE",
            data: result
        })
    }
    // return dips(obj);
    // return { type: "VOTE", data: id }
}

// async function dips(obj) {
//     const tempAn = { ...obj, votes: obj.votes + 1 }
//     const result = await anecdoteService.update(obj.id, tempAn)
//     return () => {dispatch({
//         type: "VOTE",
//         data: result
//     })}
// }

export const init = (data) => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch({
            type: "INIT",
            data: anecdotes
        })
    }
}

export const del = (id) => {
    return { type: "DEL", id: id }
}

const anecdoteReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case "VOTE":
            console.log("VOTE")
            const id = action.data.id;
            state = state.map(o => o.id !== id ? o : action.data);
            break;
        case "CREATE":
            console.log("CREATE")
            if (action.data !== undefined && action.data.content !== undefined) {
                state = state.concat(action.data);
                return state
            }
            break;
        case "INIT":
            console.log("INIT");
            state = action.data;
            break;
        case "DEL":
            console.log("DEL");
            state = state.filter(o => o.id !== action.id);
            break;
        default:
            console.log("DEFAULT");
    }

    return state
}

export default anecdoteReducer