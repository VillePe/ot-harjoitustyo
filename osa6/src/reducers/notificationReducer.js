
export const clear = () => {
    return { type: "CLEAR" }
}

const notificationReducer = (state = "", action) => {
    console.log(action.type)
    switch (action.type) {
        case "VOTE":
            state = { message: "Vote added!" };
            console.log("NOTIFREDUCE - VOTE ADDED");
            break;
        case "CLEAR":
            state = "";
            break;
    }

    return state;
}

export default notificationReducer