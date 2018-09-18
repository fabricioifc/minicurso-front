import React from "react";

class PostForm extends React.Component {

  componentDidUpdate() {
    if (this.props.post) {
      const {title, message} = this.props.post
      this.title.value = title
      this.message.value = message
    }
    
  }

  handleSubmit = event => {
    event.preventDefault()
    const titleValue = this.title.value
    const messageValue = this.message.value
    const post = {title: titleValue, message: messageValue}
    if (this.props.post) {
      post.id = this.props.post.id
    }
    this.props.onSavePost(post)

    this.title.value = ''
    this.message.value = ''
    this.title.focus()    
  }

  render() {
    
    return (
      <div>
        <h1>{this.props.editando ? 'Alterando Post' : 'Criar Post'}</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" ref={(input) => this.title = input} placeholder="Título" required autoFocus></input>
          <textarea rows="5" name="message" ref={(input) => this.message = input} placeholder="Mensagem"></textarea>
          <button className="btn btn-primary" type="submit">Postar</button>
          {
            this.props.editando ? 
            <button onClick={() => this.props.onCancel()} className="btn btn-default" type="button">Cancelar</button> :
            null
          }
        </form>
      </div>
    )
  }
}

export default PostForm