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
import { Card, CardHeader, IconButton, Collapse, List, ListItemText, ListItemSecondaryAction, ListItem, Snackbar } from "@material-ui/core";
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
import { createPost, postUpVote, postDownVote, onCloseSnackBar, postUpComments, postDownComments } from '../../actions/posts'
import { MySnackbarContentWrapper } from "../../components/SnackBar/snackBar";
import Axios from "axios";
import Comments from "../../components/Comments/comments";

const AppWrapper = styled.div`
    display:flex;
    flex-direction:column;  
    width:100vw;
    align-items:center;
`
const FeedContent = styled.div`
    display:flex;
    flex: 1;
    flex-direction:column;
    justify-content:center;
    align-items:center; 
`
const InsertPostWrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 11;
  align-items: center;
  flex-direction: column;
  background-color: #FAFAFA;
  width: 100vw;
  height: 20vw;
`
const FormSyled = styled.form`
    display:flex;
    flex-direction:column;
    width:100%;
    padding: 10px;
`
const PostCreate = styled.div`
  position:fixed;
  top:20px; 
  z-index: 10;
  width: 50vw;
`
const CardStyled = styled(Card)`
  display:flex;
  flex-direction:column;
  padding:10px;
  margin-bottom:30px;
  align-items:center;
`
const CardComment = styled(Card)`
  display:flex;
  flex-direction:column;
  padding:10px;
  margin-bottom:30px;
  position:fixed;
  top:20px;
  flex:1;
  `
const DivStyled = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  align-items:center;
`
const DivPosts = styled.div`
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
      name: "",
      post: ""
    };
  }

  componentDidMount() {
    this.props.getPosts()
    const token = window.localStorage.getItem("token");
    if (!token) {
      this.props.goToLoginPage();
    }
  }

  // componentDidUpdate(prevProps){
  //   if(this.props.posts !== prevProps.post){
  //     this.setState({
  //       post: this.props.posts
  //     })
  //   }
  // }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClose = () => {
    this.props.onCloseSnackBar()
  };

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onCreatePost = (event) => {
    event.preventDefault()
    const { title, post } = this.state
    this.props.createPost(title, post)
  }

  clickUpVote = (post) => {
    this.props.postUpVote(post.id)
    // if (post.userVoteDirection < 0) {
    //   this.props.postUpVote(post.id)
    // } 
  }

  clickDownVote = (post) => {
    this.props.postDownVote(post.id)
    // if (post.userVoteDirection > 0) {
    //   this.props.postDownVote(post.id)
    // } 
  }
  clickDownVoteComments = (commentId, postId) => {
    console.log('comment', commentId, 'post', postId)
    this.props.postDownVoteComments(commentId, postId)
    // if (post.userVoteDirection > 0) {
    //   this.props.postDownVoteComments(post.id)
    // } 
  }

  clickUpVoteComments = (commentId, postId) => {
    console.log('comment', commentId, 'post', postId)
    this.props.postUpVoteComments(commentId, postId)
    // if (post.userVoteDirection < 0) {
    //   this.props.postUpVoteComments(post.id)
    // } 
  }
  comments = async (postId) => {
    console.log(postId)
    const token = window.localStorage.getItem("token");

    try {
      const response = await Axios.get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${postId}`,
        {
          headers: {
            auth: token
          }
        }
      );
      let feedComments = response.data.post.comments
      this.setState({
        [postId]: feedComments
      })
      console.log(this.state)
    } catch (e) {
      window.alert(e.message)
    }
  }
  render() {
    console.log(this.state)
    return (
      <AppWrapper>
        <InsertPostWrapper>
          <PostCreate>

            <CardStyled>
              <FormSyled onSubmit={this.onCreatePost}>
                <TextField placeholder={"Sobre o que você quer falar?"}
                  name="title"
                  value={this.state.title}
                  onChange={this.handleFieldChange} 
                  style={{ marginBottom: '20px' }}
                  />
                <TextField
                  multiline rows={4}
                  style={{ marginBottom: '20px' }}
                  placeholder={"Solta o verbo!"}
                  name="post"
                  value={this.state.post}
                  onChange={this.handleFieldChange}>
                </TextField>
                <Button
                  color="primary"
                  type='submit'
                  variant="contained"
                  disabled={!this.state.post}
                >
                  Postar
                    </Button>
              </FormSyled>
            </CardStyled>
          </PostCreate>
        </InsertPostWrapper>
        <FeedContent>
          {this.props.posts.map((post) => (
            <DivPosts key={post.id}>
              <Post
                key={post.id}
                titleCard={post.title}
                usernameCard={post.username}
                textCard={post.text}
                votesCountCard={post.votesCount}
                commentsNumberCard={post.commentsNumber}
                upVote={post.userVoteDirection > 0 ? <UpVote /> : <UpVoteOutlined />}
                DownVote={post.userVoteDirection < 0 ? <DownVote /> : <DownVoteOutlined />}
                showComments={() => this.comments(post.id)}
                onClickUpVote={() => this.clickUpVote(post)}
                onClickDownVote={() => this.clickDownVote(post)}
                comments={this.state[post.id] && this.state[post.id].map((comment) => (
                  <Comments
                    UserName={comment.username}
                    onClickUpVoteComment={() => this.clickUpVoteComments(comment.id, post.id)}
                    onClickDownVoteComment={() => this.clickDownVoteComments(comment.id, post.id)}
                    upVote={comment.userVoteDirection > 0 ? <UpVote /> : <UpVoteOutlined />}
                    DownVote={comment.userVoteDirection < 0 ? <DownVote /> : <DownVoteOutlined />}
                    commentsNumberCard={comment.commentsNumber}
                    textComments={comment.text}
                    votesCountCard={comment.votesCount}
                  ></Comments>
                )
                )}
              >
              </Post>
            </DivPosts>
          ))}
        </FeedContent>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.props.variant}
            message={this.props.msg}
          />
        </Snackbar>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    msg: state.posts.msg,
    variant: state.posts.variant,
    open: state.posts.open,
  };
};

const mapDispatchToProps = dispatch => ({
  goToCreateUser: () => dispatch(push(routes.createUser)),
  goToFeed: () => dispatch(push(routes.feed)),
  goToLoginPage: () => dispatch(push(routes.root)),
  getPosts: () => dispatch(getPosts()),
  createPost: (title, post) => dispatch(createPost(title, post)),
  postUpVote: (id) => dispatch(postUpVote(id)),
  postDownVote: (id) => dispatch(postDownVote(id)),
  onCloseSnackBar: () => dispatch(onCloseSnackBar()),
  postDownVoteComments: (commentId, postId) => dispatch(postDownComments(commentId, postId)),
  postUpVoteComments: (commentId, postId) => dispatch(postUpComments(commentId, postId))

  //   goToFeed: () => dispatch(push(routes.login)),
  //   goToApplicationForm: () => dispatch(push(routes.applicationForm)),
  //   doLogin: (email, password) => dispatch(login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);