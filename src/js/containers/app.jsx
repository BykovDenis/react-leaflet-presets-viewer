import React, { PropTypes } from 'react';
import { Map, MapComponent, TileLayer, ZoomControl } from 'react-leaflet';
import { connect } from 'react-redux';
import './../libs/L.Control.Search';

class App extends MapComponent {
  static get propTypes() {
    return {
      currentStore: PropTypes.object.isRequired
    };
  }
  componentDidMount() {
    // Геокодинг
    const leafletMap = this.leafletMap.leafletElement;
    this.leafletMap.leafletElement.addControl(L.control.search());
    console.log(leafletMap);
  }
  render() {
    [this.lat, this.lon] = [
      parseFloat(this.props.currentStore.MapReducer.lat, 10) || 0,
      parseFloat(this.props.currentStore.MapReducer.lon, 10) || 0
    ];
    this.zoom = parseInt(this.props.currentStore.MapReducer.zoom, 10);
    this.urls = this.props.currentStore.MapReducer.baseURLs;
    this.attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    this.urlLayers = this.urls.map(
      (elem, index) =>
        <TileLayer url={elem} attribution={this.attribution} key={index.toString()} />
    );
    return (
      <div className="global-map">
        <Map
          center={[this.lat, this.lon]}
          zoom={this.zoom}
          zoomControl={false}
          ref={m => (this.leafletMap = m)}
        >
          {this.urlLayers}
          <ZoomControl position="topright" />
        </Map>
      </div>
    );
  }
}

export default connect(
  state => ({ currentStore: state })
)(App);
