import React, { PropTypes } from 'react';
import { Map, MapComponent, TileLayer, ZoomControl } from 'react-leaflet';
import { connect } from 'react-redux';
import L from './../libs/L.Control.Search';
import NavigationTools from './../components/navigation-tools';

class App extends MapComponent {
  static get propTypes() {
    return {
      currentStore: PropTypes.object.isRequired
    };
  }
  componentDidMount() {
    // Геокодинг
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.addControl(L.control.search());
  }
  componentWillMount() {
    [this.lat, this.lon] = [
      parseFloat(this.props.currentStore.MapReducer.lat, 10),
      parseFloat(this.props.currentStore.MapReducer.lon, 10)
    ];
    this.zoom = parseInt(this.props.currentStore.MapReducer.zoom, 10);
    this.urls = this.props.currentStore.MapReducer.baseURLs;
    this.attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    this.urlLayers = this.urls.map(
      (elem, index) =>
        <TileLayer url={elem} attribution={this.attribution} key={index.toString()} />
    );
  }
  render() {
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
          <NavigationTools />
        </Map>
      </div>
    );
  }
}

export default connect(
  state => ({ currentStore: state })
)(App);
