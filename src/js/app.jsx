import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.i = 4;
  }
  render() {
    console.log(this.i);
    return (
      <div>
        Простейший компонент
      </div>);
  }
}

