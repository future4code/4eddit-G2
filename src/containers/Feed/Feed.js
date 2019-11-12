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
import { Card, CardHeader, IconButton, Collapse, List, ListItemText, ListItemSecondaryAction, ListItem } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import UpVote from '@material-ui/icons/KeyboardArrowUp';
import DownVote from '@material-ui/icons/KeyboardArrowDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const FormSyled = styled.form`
    display:flex;
    flex-direction:column;
   
`

export const CardStyled = styled(Card)`
  width: 50%;
  display:flex;
  flex-direction:column;
  padding:10px;
  margin-bottom:30px;
`

export const CardComment = styled(Card)`
  width: 50%;
  display:flex;
  flex-direction:column;
  padding:10px;
  margin-bottom:30px;
  position:fixed;
  top:20px;
  
  `
export const DivStyled = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            expanded: false,
        };
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onClickLogin = () => {
        const { email, password } = this.state
        this.props.doLogin(email, password)
    }

    render() {
        const { email, password } = this.state;
        // const { errorMessage } = this.props;
        return (
            <DivStyled>
                <CardComment>
                    <FormSyled>
                        <TextField multiline rows={4} style={{ marginBottom: '20px' }}>

                        </TextField>
                        <Button color="primary" type='submit' variant="contained">
                            Comentar
                </Button>
                    </FormSyled>
                </CardComment>
                <CardStyled >
                    <CardHeader


                        title="Shrimp and Chorizo Paella"

                    />

                    <CardContent>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
                    </CardContent>
                    <CardActions disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <UpVote />
                        </IconButton>
                        <p>0</p>
                        <IconButton aria-label="Share">
                            <DownVote />
                        </IconButton>
                        <p>0</p>
                        <Button
                            size="small"
                            color="primary"
                            style={{ alignSelf: 'center' }}
                        >
                            Learn More
        </Button>
                        <IconButton
                            // className={classnames(classes.expand, {
                            //   [classes.expandOpen]: this.state.expanded,
                            // })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <List >
                                {[0, 1, 2, 3].map(value => (
                                    //INSERIR USUARIO E COMENTARIO
                                    <ListItem key={value} role={undefined} dense button style={{position:'relative'}}>
                                        
                                        <ListItemText primary={`Line item ${value + 1}`} />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Add to favorites">
                                                <UpVote />
                                            </IconButton>
                                            <p>0</p>
                                            <IconButton aria-label="Share">
                                                <DownVote />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Collapse>
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
    //   goToHomePage: () => dispatch(push(routes.home)),
    //   goToFeed: () => dispatch(push(routes.login)),
    //   goToApplicationForm: () => dispatch(push(routes.applicationForm)),
    //   doLogin: (email, password) => dispatch(login(email, password))
});

export default connect(null, mapDispatchToProps)(Feed);