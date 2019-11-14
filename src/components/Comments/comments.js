import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Card, CardHeader, IconButton, Collapse, List, ListItemText, ListItemSecondaryAction, ListItem, TextField } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import UpVote from '@material-ui/icons/KeyboardArrowUp';
import DownVote from '@material-ui/icons/KeyboardArrowDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from "styled-components";

export const CardStyled = styled(Card)`
  width: 50vw;
  display:flex;
  flex-direction:column;
  margin-bottom:30px;
`
const IconsWrapper = styled.div`
    display:flex;
`
const CommentsWrapper = styled.div`
    display:flex;
`
const CommentsArea = styled.div`
    display:flex;
    justify-content:space-between;
    border: 1px solid red;
`

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: '',
        };
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
        this.props.showComments()
      };

    handleFieldChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

      

    render(){
    return (
        <div>
            <CommentsArea>

            <CommentsWrapper>
                <div>
                    <p>{this.props.UserName}:{this.props.textComments}</p>
                </div>
                <IconsWrapper>
                    <IconButton onClick={this.props.onClickUpVoteComment} >
                    {this.props.upVote}
                    </IconButton>
                        <p>{this.props.votesCountCard}</p>
                    <IconButton onClick={this.props.onClickDownVoteComment}>
                        {this.props.DownVote}
                    </IconButton>
                </IconsWrapper>
            </CommentsWrapper>
            </CommentsArea>
            <div>
                <TextField 
                    name="comentario"
                     value={this.state.comentario}
                      type="text"
                      onChange={this.handleFieldChange}></TextField>
                <Button onClick={this.props.onClickSendComment}></Button>
            </div>
            
        </div>

    );
}
}

export default Comments; 