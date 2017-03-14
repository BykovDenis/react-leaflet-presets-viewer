import React, { Component, PropTypes } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';

class App extends Component {
  static get propTypes() {
    return {
      currentStore: PropTypes.object.isRequired
    };
  }
  render() {
    [this.lat, this.lon] = [
      parseFloat(this.props.currentStore.Map.lat, 10) || 0,
      parseFloat(this.props.currentStore.Map.lon, 10) || 0
    ];
    this.zoom = parseInt(this.props.currentStore.Map.zoom, 10);
    this.urls = this.props.currentStore.Map.baseURLs;
    this.attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    this.urlLayers = this.urls.map(
      (elem, index) =>
        <TileLayer url={elem} attribution={this.attribution} key={index.toString()} />
    );
    return (
      <div className="global-map">
        <Map center={[this.lat, this.lon]} zoom={this.zoom}>
          {this.urlLayers}
        </Map>
      </div>
    );
  }
}

export default connect(
  state => ({ currentStore: state })
)(App);
