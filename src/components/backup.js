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



/* eslint-disable no-undef */
import React from "react";
import './../App.css';
const { compose, withProps, withStateHandlers, withState } = require("recompose");
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
    withState('currentMarker'),
    withStateHandlers(() => ({
        isOpen: false
    }), {
            onToggleOpen: ({ isOpen }) => () => ({
                isOpen: !isOpen,
            })
        }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={13}
        defaultCenter={props.center}
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
                        props.onToggleOpen();
                        props.changeSelectedMarker(key);
                    }}>

                    {/* Display infobox */}
                    {props.isOpen && <InfoBox
                        onCloseClick={props.onToggleOpen}
                        options={{ closeBoxURL: ``, enableEventPropagation: true }}
                        position={{ lat: value.location.lat, lng: value.location.lng }}
                    >
                        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                                TEST
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

    changeSelectedMarker = (markerNum) => {
        var selectedMarker = this.state.markers;
        var temp = Object.values(selectedMarker)[markerNum];
        this.setState({ marker: temp });
        this.props.handleMarkerClick(markerNum)
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

// function updateSelectedMarker(markerNum) {
//   this.props.updateSelectedMarker(markerNum)
// }


export default MyMap;


// ***********************************************

import React from "react";
import './../App.css';
// const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");




const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 40.7413549, lng: -73.9980244 }}
        defaultOptions={{ mapTypeControl: false }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >

            {props.showMarkers && Object.entries(props.markers).map(([key, value]) =>
                <Marker position={{ lat: value.location.lat, lng: value.location.lng }} key={key} />
            )}

        </MarkerClusterer>


        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
));





class MyMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showMarkers: false,
            markers: {},
        };
    }

    // add markers only after rendering the map
    componentDidMount() {
        this.setState({ showMarkers: true });
        this.setState({ markers: this.props.markers });

        // console.log(Object.getOwnPropertyNames(this.props.selectedMarker).length)
        // if (this.props.selectedMarker.length !== undefined) this.setState({ marker: this.props.selectedMarker })
    }

    render() {
        return (
            <div id="map">
                <MyMapComponent
                    markers={this.state.markers}
                    showMarkers={this.state.showMarkers}
                    marker={this.props.selectedMarker}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDh8QgxRUXxMpGT2LoeuyIdUCmjU5Dhr7w&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `inherit` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}


export default MyMap;




// *****************

import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

export default class GoogleMapBox extends React.Component {

    state = {
        map: undefined
    };

    mapLoaded(ref) {
        this.state.map = ref;
    }

    mapMoved() {
        console.log('mapMoved: ' + JSON.stringify(this.state.map.getCenter()))
    }

    zoomChanged() {
        console.log(this.state.map.getZoom())
    }

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap(props => {
            // let ref = {};
            return <GoogleMap
                onIdle={this.mapMoved.bind(this)}
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
                ref={this.mapLoaded.bind(this)}
                onZoomChanged={this.zoomChanged.bind(this)}
            >
            </GoogleMap>
        }))

        return (
            <MyMapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=KEY&libraries=geometry,drawing,places" //"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}