const initialState = {
    posts: [],
    
}


const posts = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POSTS":
            return { ...state, posts: action.payload.posts }
        default:
            return state;
    }


}

export default posts 