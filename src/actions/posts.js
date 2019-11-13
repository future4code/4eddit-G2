import axios from 'axios'

export const getPosts = () => async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    try{
    const response = await axios.get(
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts",
        {
			headers: {
				auth: token
			}
		}
	);
    dispatch(posts(response.data.posts));
    }catch(e){
        window.alert(e.message)
    }
};

export const posts = posts => {
	return {
		type: "SET_POSTS",
		payload: {
			posts
		}
	}
};
