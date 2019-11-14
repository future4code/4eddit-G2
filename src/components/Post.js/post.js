import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Card, CardHeader, IconButton, Collapse, List, ListItemText, ListItemSecondaryAction, ListItem } from "@material-ui/core";
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
                subheader={this.props.usernameCard}
            />
            <CardContent>
                <Typography component="p">
                    {this.props.textCard}
          </Typography>
            </CardContent>
            <CardActions disableActionSpacing  style={{ justifyContent: 'space-between' }}>
                
                <IconButton onClick={this.props.onClickUpVote} >
                   {this.props.upVote}
                </IconButton>
                    <p>{this.props.votesCountCard}</p>
                <IconButton onClick={this.props.onClickDownVote}>
                    {this.props.DownVote}
                </IconButton>
                    
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
            </Collapse>
        </CardStyled>

    );
}
}

export default Post; 