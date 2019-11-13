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
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const ErrorMessage = styled.p`
  color: red;
`
const FormSyled = styled.form`
    display:flex;
    flex-direction:column;
`
const LoginStyled = styled(Card)`
  width: 30vw;
  display:flex;
  flex-direction:column;
  padding:10px;
  box-shadow: 4px 4px 5px lightgray;
`
const StyledBtn = styled(Button)`
  background-color: #00C1C8;
  font-weight: bold;
  color: white;

  :hover{
  background-color: #00adb4;
  }
`
const DivStyled = styled.div`
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
      password: "",
      showPassword: false,
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
    this.props.doLogin(email, password)
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };



  render() {
    const { email, password } = this.state;
    // const { errorMessage } = this.props;
    return (
      <DivStyled>

        <LoginStyled>
          <FormSyled onSubmit={this.onClickLogin}>

            <TextField
              onChange={this.handleFieldChange}
              name="email"
              type="email"
              label="E-mail"
              value={email}
              style={{
                margin: '20px',
              }}
              required={true}
              inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" }}
              //checar se o pattern funciona, acho que não ta pegando
            />

            <TextField
              onChange={this.handleFieldChange}
              id="outlined-adornment-password"
              name="password"
              type={this.state.showPassword ? 'text' : 'password'}
              label="Senha"
              value={password}
              style={{ margin: '20px', }}
              required={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <StyledBtn
              variant="contained"
              color="primary"
              type='submit'
              style={{
                margin: '10px',
              }}
            > Login
            </StyledBtn>

            <StyledBtn
              variant="contained"
              color="primary"
              onClick={this.props.goToCreateUser}
              style={{
                margin: '10px',
              }}
            > Cadastrar
            </StyledBtn>

            {/* {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null} */}

          </FormSyled>
        </LoginStyled>

      </DivStyled >

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

export default connect(null, mapDispatchToProps)(LoginPage);
