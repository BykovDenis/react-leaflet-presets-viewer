import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class App extends Component {
  constructor() {
    super();
    this.position = [51.505, -0.09];
  }
  render() {
    return (
      <div className="global-map">
        <Map center={this.position} zoom={13}>
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={this.position}>
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
