import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Импорт actions
import getDataWeather from '../redux/actions/weather';

class App extends Component {
  static get propTypes() {
    return {
      currentStore: PropTypes.object.isRequired,
      getWeather: PropTypes.func.isRequired
    };
  }
  componentDidMount() {
    this.props.getWeather();
  }
  render() {
    return (
      <div>
        <h1>Погодные виджеты</h1>
        {this.props.currentStore.Weather.cityName}
        <br />
        <input type="button" value="get weather" />
      </div>
    );
  }
}

export default connect(
  state => ({ currentStore: state }),
  dispatch => ({ getWeather: () => { dispatch(getDataWeather()); } })
)(App);
