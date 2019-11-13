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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getPosts } from '../../actions/posts' 
import Post from "../../components/Post.js/post";
import UpVote from '@material-ui/icons/ArrowDropDownCircle';
import UpVoteOutlined from '@material-ui/icons/ArrowDropDownCircleOutlined';
import DownVote from '@material-ui/icons/KeyboardArrowDown';
import DownVoteOutlined from '@material-ui/icons/KeyboardArrowDownOutlined';


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
  /* justify-content:center; */
  align-items:center;
`

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    componentDidMount() {
        this.props.getPosts()
        const token = window.localStorage.getItem("token");
        if (!token) {
          this.props.goToLoginPage();
        }
      }


    render() {
        console.log(this.props.posts)
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
                {this.props.posts.map((post) =>(
                    <Post 
                    titleCard={post.title}
                    usernameCard={post.username}
                    textCard={post.text}  
                    votesCountCard={post.votesCount}
                    commentsNumberCard={post.commentsNumber}
                        upVote={post.userVoteDirection > 0 ? <UpVote /> : <UpVoteOutlined />  }
                        DownVote={post.userVoteDirection < 0 ? <DownVote /> : <DownVoteOutlined />  }
                    >
                        
                        
                    </Post>
                ))}
            </DivStyled>
        );
    }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

const mapDispatchToProps = dispatch => ({
    goToCreateUser: () => dispatch(push(routes.createUser)),
    goToFeed: () => dispatch(push(routes.feed)),
    goToLoginPage: () => dispatch(push(routes.root)),
    getPosts: () => dispatch(getPosts()),
    //   goToFeed: () => dispatch(push(routes.login)),
    //   goToApplicationForm: () => dispatch(push(routes.applicationForm)),
    //   doLogin: (email, password) => dispatch(login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);