import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDh8QgxRUXxMpGT2LoeuyIdUCmjU5Dhr7w",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    mapMarkers: this.markers
  }),
  withScriptjs,
  withGoogleMap
)((props) =>

  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 40.7413549, lng: -73.9980244 }}
  >
    
      <Marker position={{ lat: 40.7413549, lng: -73.9980244 }} onClick={props.onMarkerClick} />
    
    {/* {props.isMarkerShown &&
      <Marker position={{ lat: 40.7413549, lng: -73.9980244 }} onClick={props.onMarkerClick} />
    } */}
  </GoogleMap>
)



// *********************




import React from "react";
const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDh8QgxRUXxMpGT2LoeuyIdUCmjU5Dhr7w&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
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

        {/* <Marker position={{ lat: 40.7413549, lng: -73.9980244 }} /> */}
        {props.showMarkers === true && (
            <MarkerClusterer
                onClick={props.onMarkerClustererClick}
                averageCenter
                enableRetinaIcons
                gridSize={60}
            >
                {console.log('hi!')}
                {props.markers.map(marker =>
                    <Marker position={{ lat: marker.location.lat, lng: marker.location.lng }} key={marker} />
                )
                }
            </MarkerClusterer>
        )
        }

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
        console.log(this.state.markers, this.state.showMarkers)
        return (
            <MapWithAMarkerClusterer showMarkers={this.state.showMarkers} markers={this.state.markers} />
        )
    }
}


export default MyMap;