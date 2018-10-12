import React, { Component } from 'react';
import './App.css';
import GoogleMap from './components/GoogleMap.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleMap />
      </div>
    );
  }
}

export default App;
