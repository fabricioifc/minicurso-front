import React from "react";
import axios from "axios";

// Componentes
import PostForm from "./PostForm";
import Post from "./Post";

const base_url = "https://ifcblog-api.herokuapp.com";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      post: { title: "", message: "", loading: false },
      posts: [],
      editando: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ post: { ...this.state.post, loading: true } });
    axios
      .get(`${base_url}/posts`)
      .then(response => {
        this.setState({
          posts: response.data,
          post: { ...this.state.post, loading: false }
        });
      })
      .catch(error => this._onError(error));
  }

  save = post => {
    if (post.id) {
      this._updatePost(post);
    } else {
      this._addPost(post);
    }
  };

  // método privado
  _addPost = post => {
    this.setState({ post: { ...this.state.post, loading: true } });
    axios
      .post(`${base_url}/posts`, { post: post })
      .then(response => {
        this.setState({
          posts: [...this.state.posts, response.data],
          post: { loading: false }
        });
      })
      .catch(error => this._onError(error));
  };

  _onError = error => {
    this.setState({ error: error.message });
    console.log(error);
  };

  // método privado
  _updatePost = post => {
    this.setState({ post: { ...this.state.post, loading: true } });
    axios
      .put(`${base_url}/posts/${post.id}`, { post: post })
      .then(response => {
        const posts = this.state.posts.map(
          p => (p.id === response.data.id ? (p = response.data) : p)
        );
        this.setState({
          posts,
          editando: false,
          post: { loading: false }
        });
      })
      .catch(error => this._onError(error));
  };

  editPost(id) {
    this.setState({ post: { ...this.state.post, loading: true } });
    axios
      .get(`${base_url}/posts/${id}`)
      .then(response => {
        this.setState({
          editando: true,
          post: { ...response.data, loading: false }
        });
      })
      .catch(error => this._onError(error));
  }

  removePost = id => {
    this.setState({ post: { ...this.state.post, loading: true } });
    axios
      .delete(`${base_url}/posts/${id}`)
      .then(response => {
        console.log(response);
        const posts = this.state.posts.filter(post => post.id !== id);
        this.setState({
          posts,
          post: { loading: false }
        });
      })
      .catch(error => this._onError(error));
  };

  onCancel = () => {
    this.setState({ post: { title: "", message: "" }, editando: false });
  };

  render() {
    return (
      <div className="main">
        <div className="left">
          <PostForm
            post={this.state.post}
            onSavePost={this.save}
            editando={this.state.editando}
            onCancel={this.onCancel}
          />
        </div>

        <div className="right">
          <div className="error">{this.state.error}</div>
          {/* {this.state.posts.map( post => {
            return (<div className="post" key={post.id}>{post.title}</div>)
          })} */}
          {this.state.posts.map(post => (
            <Post
              key={post.id}
              post={post}
              onRemovePost={this.removePost.bind(this)}
              onEditPost={this.editPost.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Posts;
