import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { routes } from "../Router";
// import { DivStyled, Div1, Div2, CardStyled } from '../../style/theme'
// import ButtonAppBar from '../../componentes/appBar'
// import { login } from "../../actions/auth";
import { Card } from "@material-ui/core";
import { login } from "../../actions/auth";

const ErrorMessage = styled.p`
  color: red;
`;

const FormSyled = styled.form`
    display:flex;
    flex-direction:column;
`

export  const CardStyled = styled(Card)`
  width: 40vw;
  display:flex;
  flex-direction:column;
  padding:10px;
`
export const DivStyled = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onClickLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state
    this.props.doLogin( email, password )
  }

  

  render() {
    const { email, password } = this.state;
    // const { errorMessage } = this.props;
    return (
      <DivStyled>
        <CardStyled >
            <FormSyled onSubmit={this.onClickLogin}>
                <TextField 
                onChange={this.handleFieldChange}
                name="email"
                type="email"
                label="E-mail"
                value={email}
                style={{margin: '20px', }}
                required={true}
                inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" }}
                />
                <TextField
                onChange={this.handleFieldChange}
                name="password"
                type="password"
                label="Password"
                value={password}
                style={{margin: '20px', }}
                required={true}
                inputProps={{ minlength: "1" }}
                />
                <Button variant="contained" color="primary"  type='submit' style={{marginBottom: '10px'}}>Login</Button>
                <Button variant="contained" color="primary" onClick={this.props.goToCreateUser}style={{marginBottom: '10px'}}>Cadastrar</Button>
                {/* {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null} */}
            </FormSyled>
      </CardStyled>
      
      </DivStyled>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     errorMessage: state.auth.loginError
//   };
// };

const mapDispatchToProps = dispatch => ({
  goToCreateUser: () => dispatch(push(routes.createUser)),
  goToFeed: () => dispatch(push(routes.feed)),
  doLogin: (email, password) => dispatch(login(email, password))
//   goToHomePage: () => dispatch(push(routes.home)),
//   goToLoginPage: () => dispatch(push(routes.login)),
//   goToApplicationForm: () => dispatch(push(routes.applicationForm)),
//   doLogin: (email, password) => dispatch(login(email, password))
});

export default connect(null,mapDispatchToProps)(LoginPage);
