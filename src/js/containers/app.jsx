import React, { PropTypes } from 'react';
import { Map, MapComponent, TileLayer, ZoomControl } from 'react-leaflet';
import { connect } from 'react-redux';
import L from './../libs/L.Control.Search';
import NavigationTools from '../components/navigation-tools/navigation-tools';
import PopupCode from '../components/popup-code/popup-code';

class App extends MapComponent {
  static get propTypes() {
    return {
      currentStore: PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.openPopup = this.openPopup.bind(this);
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
    this.currentURL = this.props.currentStore.MapReducer.baseURLs[1];
  }
  openPopup() {
    const popup = document.getElementById('popup_code');
    if (popup) {
      if (popup.style.display === 'none') {
        popup.style.display = 'flex';
        popup.style.zIndex = '9999';
      } else {
        popup.style.display = 'none';
      }
    }
  }
  render() {
    return (
      <div className="global-map">
        <NavigationTools currentURL={this.currentURL} openPopup={this.openPopup} />
        <PopupCode currentURL={this.currentURL} />
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
