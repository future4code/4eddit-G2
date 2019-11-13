import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { routes } from "../Router";
// import { DivStyled, Div1, Div2, CardStyled } from '../../style/theme'
// import ButtonAppBar from '../../componentes/appBar'
import { signUp } from "../../actions/auth";
import { Card } from "@material-ui/core";

const ErrorMessage = styled.p`
  color: red;
`;


export const CardStyled = styled(Card)`
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

const FormSyled = styled.form`
    display:flex;
    flex-direction:column;
`


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user:"",
        };
    }

    onHandleClick(){
        console.log('clicou')
    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onClickCreateUser = (event) => {
        
        event.preventDefault();
        const { email, password, user } = this.state
        this.props.signUp(email, password, user)
    }

    render() {
        const { email, password, user } = this.state;
        // const { errorMessage } = this.props;
        return (
            <DivStyled>
                <CardStyled >
                    <FormSyled onSubmit={this.onClickCreateUser}>
                        <TextField
                            onChange={this.handleFieldChange}
                            name="user"
                            type="text"
                            label="Usuário"
                            value={user}
                            style={{ margin: '20px', }}
                            required={true}
                        />
                        <TextField
                            onChange={this.handleFieldChange}
                            name="email"
                            type="email"
                            label="E-mail"
                            value={email}
                            style={{ margin: '20px', }}
                            required={true}
                        />
                        <TextField
                            onChange={this.handleFieldChange}
                            name="password"
                            type="password"
                            label="Senha"
                            value={password}
                            style={{ margin: '20px', }}
                            required={true}
                        />
                        <Button variant="contained" color="primary" type='submit' style={{ marginBottom: '10px' }}>Cadastrar</Button>
                        <Button variant="contained" color="primary"  onClick={this.props.goToLogin} style={{marginBottom: '10px'}}>Voltar</Button>
                        
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
    goToLogin: () => dispatch(push(routes.root)),
    signUp: (email, password, user) => dispatch(signUp(email, password, user))
    //   goToHomePage: () => dispatch(push(routes.home)),
    //   goToLoginPage: () => dispatch(push(routes.login)),
    //   goToApplicationForm: () => dispatch(push(routes.applicationForm)),
    //   doLogin: (email, password) => dispatch(login(email, password))
});

export default connect(null, mapDispatchToProps)(LoginPage);
