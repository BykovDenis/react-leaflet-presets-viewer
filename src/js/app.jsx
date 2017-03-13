import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Импорт actions
import getDataWeather from './redux/actions/weather';

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
        <h1>Погодные виджеты</h1>
        {this.props.currentStore.Weather.cityName}
        <br />
        <input type="button" value="get weather" onClick={this.props.currentStore.getWeather} />
      </div>
    );
  }
}

/*
export default connect(
  state => ({ currentStore: state }),
  dispatch => ({ getWeather: () => { dispatch(getDataWeather()); } })
)(App);

*/
function mapStateToProps(state) {
  return {
    currentStore: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWeather: bindActionCreators(getDataWeather, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

