/* eslint-disable no-undef */
import React from "react";
import './../App.css';
const { compose, withProps, withStateHandlers } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDh8QgxRUXxMpGT2LoeuyIdUCmjU5Dhr7w&v=3.exp&libraries=geometry,drawing,places",
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
      })
    }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={ 13 }
    defaultCenter={ props.center }
    defaultOptions={{ mapTypeControl: false }}
  >

    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >

      {/* Loop through markers */}
      {props.showMarkers && Object.entries(props.markers).map(([key, value]) =>
        <Marker position={{ lat: value.location.lat, lng: value.location.lng }} 
                key={key} 
                onClick={() => {
                  props.displayInfo(key);
                  props.changeSelectedMarker(key);
        }}>

          {/* Display Infobox */}
          {(props.isOpen && props.markerKey === key) && <InfoBox
            onCloseClick={props.onToggleOpen}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >

            <div style={{ backgroundColor: `white`, opacity: 0.9, padding: `10px`, borderRadius: `10px`, textAlign: `left`, minWidth: `170px`, border: `1px solid #c4c4c4` }}>
              <div style={{ fontSize: `14px`, fontColor: `blue`, padding: `0`, margin: `0` }}>
                <p style={{ fontWeight: `bold`, fontSize: `1.05rem`, margin: `1px`}}>{value.title}</p>
                <p style={{ margin: `1px`}}>{value.address}</p>
                <p style={{ margin: `1px` }}>{value.city}, {value.state} {value.zip}</p>
              </div>
            </div>

          </InfoBox>}

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
      marker: this.props.selectedMarker
    };
  }

  // add markers only after rendering the map
  componentDidMount() {
    this.setState({ showMarkers: true });
    this.setState({ markers: this.props.markers });
  }

  // changes selected marker in current and parent state
  changeSelectedMarker = (markerNum) => {
    var selectedMarker = this.state.markers;
    var temp = Object.values(selectedMarker)[markerNum];
    this.setState({ marker: temp });
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