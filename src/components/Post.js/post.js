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
  width: 50%;
  display:flex;
  flex-direction:column;
  padding:10px;
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
                  <p>  {this.props.textCard}</p>
          </Typography>
            </CardContent>
            <CardActions disableActionSpacing>
                <IconButton >
                   {this.props.upVote}
                </IconButton>
                    <p>{this.props.votesCountCard}</p>
                <IconButton >
                    <DownVote />
                </IconButton>
                    <p>{this.props.commentsNumberCard}</p>
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
                    {/* <List >
                        {[0, 1, 2, 3].map(value => (
                            //INSERIR USUARIO E COMENTARIO
                            <ListItem key={value} role={undefined} dense button style={{ position: 'relative' }}>

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
                    </List> */}
                </CardContent>
            </Collapse>
        </CardStyled>

    );
}
}

export default Post; 