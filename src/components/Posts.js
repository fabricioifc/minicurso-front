import React from "react";
import axios from "axios";

// Componentes
import PostForm from "./PostForm";
import Post from "./Post";

// Loading GIF
import loadingImg from "../images/loading.gif";

const base_url = 'https://ifcblog-api.herokuapp.com'

class Posts extends React.Component {

  constructor() {
    super()
    this.state = {
      post: null,
      posts: [],
      editando: false,
      error: null,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading:true})
    axios.get(`${base_url}/posts`)
    .then(response => {
      this.setState({
        posts: response.data, loading:false
      })
    })
    .catch(error => this._onError(error))
  } 

  save = (post) => {
    if (post.id) {
      this._updatePost(post)
    } else {
      this._addPost(post)
    }
  }
  
  // método privado
  _addPost = (post) => {
    this.setState({loading:true})
    axios.post(`${base_url}/posts`, {post: post})
    .then(response => {
      this.setState({
        posts: [...this.state.posts, response.data],
        loading:false
      })
    })
    .catch(error => this._onError(error))
  }

  _onError = (error) => {
    this.setState({error: error.message})
    console.log(error);
  }

  // método privado
  _updatePost = (post) => {
    this.setState({loading:true})
    axios.put(`${base_url}/posts/${post.id}`, {post: post})
    .then(response => {
      const posts = this.state.posts.map(
        p => p.id === response.data.id ? p = response.data : p
      )
      this.setState({posts, post: null, editando: false, loading:false})
    })
    .catch(error => this._onError(error))
  }

  editPost(id) {
    this.setState({loading:true})
    axios.get(`${base_url}/posts/${id}`)
    .then(response => {
      this.setState({
        post: response.data,
        editando: true,
        loading:false
      })      
    })
    .catch(error => this._onError(error))
  }

  removePost = (id) => {
    this.setState({loading:true})
    axios.delete(`${base_url}/posts/${id}`)
    .then(response => {
      console.log(response);
      const posts = this.state.posts.filter(
        post => post.id !== id
      )
      this.setState({posts, loading:false})
    })
    .catch(error => this._onError(error))
  }

  onCancel = () => {
    this.setState({post: {title: '', message: ''}, editando: false})
  }

  render() {

    return (
      <div className="main">
        {this.state.loading ? <span className='loading'><img src={loadingImg} /></span> : null}
        
        <div className="left">
          <PostForm 
            post={this.state.post} 
            onSavePost={this.save} 
            editando={this.state.editando}
            onCancel={this.onCancel} />
        </div>
        
        <div className="right">
          <div className="error">{this.state.error}</div>
          {/* {this.state.posts.map( post => {
            return (<div className="post" key={post.id}>{post.title}</div>)
          })} */}
          {this.state.posts.map( post => 
            <Post key={post.id} post={post} onRemovePost={this.removePost.bind(this)} onEditPost={this.editPost.bind(this)} /> 
          )}
        </div>
      </div>
    )
  }
}

export default Posts