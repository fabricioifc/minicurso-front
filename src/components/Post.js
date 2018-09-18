import React from "react";

class Post extends React.Component {

  render() {
    const { post, onRemovePost, onEditPost} = this.props
    
    return (
      <div className="post">
        {/* <h2>{this.props.post.title}</h2> */}
        {/* <p>{this.props.post.message}</p> */}
        <h3>{post.title}</h3>
        <small className="postMessage">{post.message}</small>
        <button className="btn btn-sm btn-warning" onClick={() => onEditPost(post.id)}>Editar</button>
        <button className="btn btn-sm btn-danger" onClick={() => onRemovePost(post.id)}>Excluir</button>
      </div>
    )
  }
}

export default Post