
export const clear = () => {
    return { type: "CLEAR" }
}

export const setNotification = (message, seconds) => {    
    return async dispatch => {
        dispatch({ type:"NOTIFICATION", message:message })
        setTimeout(() => {
            dispatch({
                type:"CLEAR"
            })
        }, seconds*1000)
    }
}

const notificationReducer = (state = "", action) => {
    console.log(action.type)
    switch (action.type) {
        case "VOTE11":
            state = { message: "Vote added!" };
            console.log("NOTIFREDUCE - VOTE ADDED");
            break;
        case "CLEAR":
            state = "";
            break;
        case "NOTIFICATION":
            state = {message:action.message};
            break;
        default:
            break;
    }

    return state;
}

export default notificationReducer