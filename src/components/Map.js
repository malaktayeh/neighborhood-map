import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from './Marker';

const GoogleMap = ({id , options, markers, handleMarkerClick, selectedMarker }) => {
  return (
    <div
      id={id} 
      style={{ height: '100vh', width: '100%' }}
      >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={options.center}
        yesIWantToUseGoogleMapApiInternals={true}
        defaultZoom={options.zoom}
      >
        {markers.map(marker => 
            <Marker
              lat={marker.location.lat}
              lng={marker.location.lng}
          />
        )}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;