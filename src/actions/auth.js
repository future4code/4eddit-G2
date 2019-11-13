import axios from "axios";
import { push } from "connected-react-router";
import { routes } from "../containers/Router";



export const login = (email, password) => async dispatch => {
    
        try {
    // dispatch(clearErrorMessageAction());
    const response = await axios.post(
      "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/login",
      {
        email,
        password
      }
    );
    window.localStorage.setItem("token", response.data.token);
    dispatch(push(routes.feed));
  } catch (e) {
    // dispatch(setErrorMessageAction(e.message));
    window.alert(e.message)
  }
}; 

export const signUp = ( email, password, username) => async dispatch => {
  
  try {
// dispatch(clearErrorMessageAction());
console.log("deu certo")
const response = await axios.post(
"https://us-central1-missao-newton.cloudfunctions.net/fourEddit/signup",
{
  email,
  password,
  username
}
);
window.localStorage.setItem("token", response.data.token);
dispatch(push(routes.feed));
} catch (e) {
// dispatch(setErrorMessageAction(e.message));
window.alert(e.message)
}
}; 