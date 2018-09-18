import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// componentes
import Posts from "./components/Posts";

class App extends Component {
  render() {
    return ( 
      <div className="container">
        <Posts />
      </div>
    );
  }
}

export default App;
