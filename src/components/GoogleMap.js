/* eslint-disable no-undef */
import React from "react";
import './../App.css';
const { compose, withProps, withStateHandlers } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } = require("react-google-maps");
// const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY +"&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `inherit` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 40.7413549, lng: -73.9980244 },
  }),
  withStateHandlers(() => ({
    isOpen: false,
    markerKey: null
  }), {
      displayInfo: ({ isOpen, markerKey }) => (key) => ({
        isOpen: markerKey !== key || !isOpen,
        markerKey: key
      }),
      display: ({ isOpen, markerKey }) => (key) => ({
        isOpen: !isOpen,
        markerKey: key
      })
    }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={ 12 }
    defaultCenter={ props.center }
    defaultOptions={{ mapTypeControl: false }}
  >

    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={ 5 }
    >

      {/* Loop through markers once component did mount*/}
      {props.showMarkers && Object.entries(props.markers).map(([key, value]) =>
        <Marker position={{ lat: value.location.lat, lng: value.location.lng }} 
                key={ key } 
                onClick={() => {
                  props.displayInfo(key);
                  props.changeSelectedMarker(key);
        }}>

          {/* gets called if one of the list items in Searchbar gets clicked  */}
          {(props.marker !== props.markerKey) && props.display(props.marker)}

          {/* Display InfoBox */}
          {(props.isOpen && props.markerKey === key) && <InfoWindow
            onCloseClick={props.onToggleOpen}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
              <div style={{ fontSize: `14px`, fontColor: `blue`, padding: `0`, margin: `0` }}>
                <p style={{ fontWeight: `bold`, fontSize: `1.05rem`, margin: `1px`}}>{value.title}</p>
                <p style={{ margin: `1px`}}>{value.address}</p>
                <p style={{ margin: `1px` }}>{value.city}, {value.state} {value.zip}</p>
              </div>
          </InfoWindow>}
          
        </Marker>
      )}
    </MarkerClusterer>
  </GoogleMap>
);

class MyMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMarkers: false,
      markers: {},
      marker: null
    };
  }

  // add markers only after rendering the map
  componentDidMount() {
    this.setState({ showMarkers: true });
    this.setState({ markers: this.props.markers });
    this.setState({ marker: this.props.marker })
  }

  // checks if a different marker was clicked in Sidebar component
  componentDidUpdate(prevProps) {
    if (this.props.selectedMarker !== prevProps.selectedMarker) {
      this.setState({ marker: this.props.selectedMarker })
    }
  }

  // changes selected marker in current and parent state
  changeSelectedMarker = (markerNum) => {
    // changes state locally
    this.setState({ marker: markerNum });
    // changes state in parent component
    this.props.handleMarkerClick(markerNum);
  }

  render() {
    return (
      <div id="map">
        <MapWithAMarkerClusterer
          markers={this.state.markers}
          marker={this.state.marker}
          showMarkers={this.state.showMarkers} 
          changeSelectedMarker={this.changeSelectedMarker}
        />
      </div>
    )
  }
}

export default MyMap;