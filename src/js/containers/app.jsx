import React, { PropTypes } from 'react';
import { Map, MapComponent, TileLayer, ZoomControl } from 'react-leaflet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import L from './../libs/L.Control.Search';
import NavigationTools from '../components/navigation-tools/navigation-tools';
import PopupCode from '../components/popup-code/popup-code';
import getPresetsParams from '../redux/actions/presets';

class App extends MapComponent {
  static get propTypes() {
    return {
      currentStore: PropTypes.object.isRequired,
      getPresetsParams: PropTypes.func.isRequired,
    };
  }
  constructor(props) {
    super(props);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.getLatLon = this.getLatLon.bind(this);
    this.state = { popupVisible: false };
    this.popupVisible = this.state.popupVisible;
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
    this.currentURL = this.props.currentStore.MapReducer.baseURLTemplates[1];
  }
  openPopup() {
    this.popupVisible = !this.state.popupVisible;
    this.state = { popupVisible: this.popupVisible };
    this.forceUpdate();
  }
  closePopup() {
    this.setState({ popupVisible: false });
  }
  getLatLon(e) {
    console.log(e.latlng.lat.toFixed(4), e.latlng.lng.toFixed(4));
    this.props.getPresetsParams(
      [e.latlng.lat.toFixed(4), e.latlng.lng.toFixed(4)],
      e.target.getZoom()
    );
  }
  render() {
    return (
      <div className="global-map">
        <NavigationTools currentURL={this.currentURL} openPopup={this.openPopup} />
        <PopupCode
          popupVisible={this.state.popupVisible}
          popupDisable={this.closePopup}
          currentURL={this.currentURL}
        />
        <Map
          center={[this.lat, this.lon]}
          zoom={this.zoom}
          zoomControl={false}
          ref={m => (this.leafletMap = m)}
          onClick={this.getLatLon}
        >
          {this.urlLayers}
          <ZoomControl position="topright" />
        </Map>
      </div>
    );
  }
}

function getPresetsParamsProps(dispatch) {
  return {
    getPresetsParams: bindActionCreators(getPresetsParams, dispatch)
  };
}

export default connect(
  state => ({ currentStore: state }),
  getPresetsParamsProps
)(App);
