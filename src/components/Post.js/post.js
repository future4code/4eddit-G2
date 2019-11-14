import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { Card, CardHeader, IconButton, Collapse } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

export const CardStyled = styled(Card)`
  width: 50vw;
  display:flex;
  flex-direction:column;
  margin-bottom:30px;
`
const PostCommentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    padding: 10px;
`
const StyledTextField = styled(TextField)`
    width: 80%;
`
const StyledBtn = styled(Button)`
    height: 55px;
    
`
const IconWrapper = styled.div`
    display: flex;
`

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
        this.props.showComments()
      };
    
    render(){
    return (
        <CardStyled >
            <CardHeader
                title={this.props.titleCard}
                subheader={"Postado por: " + this.props.usernameCard}
            />
            <CardContent>
                <Typography component="p">
                    {this.props.textCard}
          </Typography>
            </CardContent>
            <CardActions disableActionSpacing  style={{ justifyContent: 'space-between' }}>
                
                <IconWrapper>
                <IconButton onClick={this.props.onClickUpVote} >
                   {this.props.upVote}
                </IconButton>
                    <p>{this.props.votesCountCard}</p>
                <IconButton onClick={this.props.onClickDownVote}>
                    {this.props.DownVote}
                </IconButton>
                </IconWrapper>
                    
                <Button
                    size="small"
                    color="primary"
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                >
                   {this.props.commentsNumberCard} Comentários
            </Button>
                
            </CardActions>
            <Collapse in={this.state.expanded}timeout="auto" unmountOnExit>
                <CardContent >
                    {this.props.comments}
                </CardContent>
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
                    <StyledBtn
                        color="primary"
                        type='submit'
                        variant="contained"
                        onClick={this.props.onClickSendComment}
                    >
                        Comentar
                    </StyledBtn>
                </PostCommentWrapper>
            </Collapse>
        </CardStyled>

    );
}
}

export default Post; 