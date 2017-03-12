import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  static get propTypes() {
    return {
      currentStore: PropTypes.object.isRequired
    };
  }
  render() {
    this.i = '111';
    console.log(this.i);
    return (
      <div>
        <h1>Простейший компонент</h1>
        {this.props.currentStore.Weather.cityName}
      </div>
    );
  }
}

export default connect(
  state => ({ currentStore: state })
)(App);

