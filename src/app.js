import ReactDom from 'react-dom';
import React from 'react';
import Map from './components/GoogleMap'

function App() {
  return (
    <div id="main">
      <Map
        id="myMap"
        options={{
          center: { lat: 41.0082, lng: 28.9784 },
          zoom: 8
        }}
        onMapLoad={map => {
          var marker = new window.google.maps.Marker({
            position: { lat: 41.0082, lng: 28.9784 },
            map: map,
            title: 'Hello Istanbul!'
          });
        }}
      />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('app'));