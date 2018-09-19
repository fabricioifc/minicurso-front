import React from "react";

// Loading GIF
import loadingImg from "../images/loading.gif";

class PostForm extends React.Component {
  componentDidUpdate() {
    this.carregar();
  }

  handleSubmit = event => {
    event.preventDefault();
    const titleValue = this.title.value;
    const messageValue = this.message.value;
    const post = { title: titleValue, message: messageValue };
    if (this.props.post) {
      post.id = this.props.post.id;
    }
    this.props.onSavePost(post);
    this.carregar();
  };

  carregar = () => {
    const { title, message } = this.props.post;

    this.title.value = title ? title : "";
    this.message.value = message ? message : "";
    this.title.focus();
  };

  _showFormTitle = () => {
    const { editando, post } = this.props;

    return <h1>{editando ? `Alterando Post ${post.id}` : "Criar Post"}</h1>;
  };

  _showCancelButton = () => {
    const { editando, onCancel } = this.props;

    if (editando)
      return (
        <button
          onClick={() => onCancel()}
          className="btn btn-default"
          type="button"
        >
          Cancelar
        </button>
      );
    return null;
  };

  render() {
    return (
      <div>
        {this._showFormTitle()}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            ref={input => (this.title = input)}
            placeholder="Título"
            required
            autoFocus
          />
          <textarea
            rows="5"
            name="message"
            ref={input => (this.message = input)}
            placeholder="Mensagem"
          />
          <button className="btn btn-primary" type="submit">
            Postar
          </button>
          {this._showCancelButton()}
          {this.props.post.loading ? (
            <span className="loading">
              <img src={loadingImg} alt="loading" />
            </span>
          ) : null}
        </form>
      </div>
    );
  }
}

export default PostForm;
