import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Импорт actions
import { getDataWeather } from './redux/actions/weather';

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
  state => ({ currentStore: state }),
  dispatch => ({ getWeather: () => { dispatch(getDataWeather()); } })
)(App);

