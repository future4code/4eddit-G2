import React, { Component } from "react";
import { Card, IconButton } from "@material-ui/core";
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
            </div>
        );
    }
}

export default Comments; 