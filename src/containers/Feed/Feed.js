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
import UpVote from '@material-ui/icons/ThumbUp';
import UpVoteOutlined from '@material-ui/icons/ThumbUpOutlined';
import DownVote from '@material-ui/icons/ThumbDown';
import DownVoteOutlined from '@material-ui/icons/ThumbDownOutlined';
import { createPost } from '../../actions/posts'

const AppWrapper = styled.form`
    display:flex;
    flex-direction:column;
    
    width:100vw;
    align-items:center;

`

const FeedContent = styled.form`
    display:flex;
    flex: 1;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
   
`
const FormSyled = styled.form`
    display:flex;
    flex-direction:column;
    width:50vw;
    
   
`
const PostCreate = styled.div`
  position:sticky;
  top:20px; 
  flex: 0;
`
export const CardStyled = styled(Card)`
  
  display:flex;
  flex-direction:column;
  padding:10px;
  margin-bottom:30px;
  align-items:center;
  

`

export const CardComment = styled(Card)`

  display:flex;
  flex-direction:column;
  padding:10px;
  margin-bottom:30px;
  position:fixed;
  top:20px;
  flex:1;
  
  `
export const DivStyled = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  align-items:center;
`

export const DivPosts = styled.div`
  
  width:100vw;
  display:flex;
  flex-direction:column;
  align-items:center;
`

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      name:"",
      post:""
    };
  }

  componentDidMount() {
    this.props.getPosts()
    const token = window.localStorage.getItem("token");
    if (!token) {
      this.props.goToLoginPage();
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
    
  };

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onCreatePost = (event) => {
    event.preventDefault()
    const { title, post} = this.state
    this.props.createPost(title, post)
  }
  render() {
    
    return (
      <AppWrapper>
        <PostCreate>
          
              <CardStyled  style={{zIndex:999999999999}}>
              <FormSyled onSubmit={this.onCreatePost}>
                <TextField placeholder={"Insira o titulo"}
                name="title"
                value={this.state.title}
                onChange={this.handleFieldChange}/>
                <TextField 
                  multiline rows={4}
                  style={{ marginBottom: '20px' }}
                  placeholder={"Insira o Texto"}
                  name="post"
                  value={this.state.post}
                  onChange={this.handleFieldChange}>
                  
                </TextField>
                <Button color="primary" type='submit' variant="contained">
                  Comentar
                    </Button>
              </FormSyled>
              </CardStyled>
          </PostCreate>
          <FeedContent>
          {this.props.posts.map((post) => (
            <DivPosts>
                <Post 
                  titleCard={post.title}
                  usernameCard={post.username}
                  textCard={post.text}
                  votesCountCard={post.votesCount}
                  commentsNumberCard={post.commentsNumber}
                  upVote={post.userVoteDirection > 0 ? <UpVote /> : <UpVoteOutlined /> }
                  DownVote={post.userVoteDirection < 0 ? <DownVote /> : <DownVoteOutlined />}
                  handleExpandClick={this.handleExpandClick}
                  expanded={this.state.expanded}
                  // showComments={() => this.onShowComments()}
                >
                </Post>
            </DivPosts>
          ))}
        </FeedContent>
      </AppWrapper>
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
  createPost:(title, post) => dispatch(createPost(title, post))
  //   goToFeed: () => dispatch(push(routes.login)),
  //   goToApplicationForm: () => dispatch(push(routes.applicationForm)),
  //   doLogin: (email, password) => dispatch(login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);