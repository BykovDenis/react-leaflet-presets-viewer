import React, { Component, PropTypes } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';

class App extends Component {
  static get propTypes() {
    return {
      currentStore: PropTypes.object.isRequired,
    };
  }
  render() {
    console.log('step');
    [this.lat, this.lon] = [this.props.currentStore.Map.lat, this.props.currentStore.Map.lon];
    this.zoom = this.props.currentStore.Map.zoom;
    this.url = this.props.currentStore.Map.baseURL;
    return (
      <div className="global-map">
        <Map center={[this.lat, this.lon]} zoom={this.zoom}>
          <TileLayer
            url={this.url}
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[this.lat, this.lon]}>
            <Popup>
              <span>
                  A pretty CSS3 popup.
                  <br />
                  Easily customizable.
              </span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default connect(
  state => ({ currentStore: state })
)(App);
