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
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`
const IconsWrapper = styled.div`
    display: flex;
`
const CommentsWrapper = styled.div`
    display: flex;
`
const CommentsArea = styled.div`
    display: flex;
`
const BoldTxt = styled.p`
    font-weight: bold;
    margin-right: 5px;
`
const TxtComentario = styled.div`
    display: flex;
    align-items: center;
`
const PostCommentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
`
const StyledTextField = styled(TextField)`
    width: 80%;
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



    render() {
        return (
            <div>
                <CommentsArea>

                    <CommentsWrapper>

                        <TxtComentario>
                            <BoldTxt>{this.props.UserName + ":"}</BoldTxt>{this.props.textComments}
                        </TxtComentario>

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

                <PostCommentWrapper>
                    <StyledTextField
                        name="comentario"
                        placeholder="Escreva seu comentário..."
                        type="text"
                        value={this.state.comentario}
                        onChange={this.handleFieldChange}
                        variant="outlined"
                    >
                    </StyledTextField>
                    <Button
                        color="primary"
                        type='submit'
                        variant="contained"
                        onClick={this.props.onClickSendComment}
                    >
                        Comentar
                    </Button>
                </PostCommentWrapper>

            </div>

        );
    }
}

export default Comments; 