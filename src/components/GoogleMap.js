import React from "react";
const { compose, withProps, withHandlers } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDh8QgxRUXxMpGT2LoeuyIdUCmjU5Dhr7w&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 40.7413549, lng: -73.9980244 }}
  >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >

      { props.showMarkers && Object.entries(props.markers).map(([key, value]) => 
        <Marker position={{ lat: value.location.lat, lng: value.location.lng }} key={key} />
        )
      }

      </MarkerClusterer>
      
  </GoogleMap>
);

class MyMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMarkers: false,
      markers: {}
    };
  }

  // add markers only after rendering the map
  componentDidMount() {
    this.setState({ showMarkers: true });
    this.setState({ markers: this.props.markers })
  }

  render() {
    // Object.entries(this.state.markers).map(([key, value]) => console.log(value))
    return (
        <MapWithAMarkerClusterer markers={this.state.markers} showMarkers={this.state.showMarkers} />

    )
  }
}


export default MyMap;