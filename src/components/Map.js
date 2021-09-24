import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from './Marker';

const SimpleMap = ({id , options, onMapLoad, markers, handleMarkerClick, selectedMarker }) => {

  return (
    <div
      id={id} 
      style={{ height: '100vh', width: '100%' }}
      >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={options.center}
        defaultZoom={options.zoom}
      >
        <Marker
          lat={options.center.lat}
          lng={options.center.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;