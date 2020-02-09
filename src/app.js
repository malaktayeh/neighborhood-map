import ReactDom from 'react-dom';
import React from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar'
import './app.css'

function App() {
  return (
    <div id="main">
      <Sidebar />
      <Map
        id="myMap"
        options={{
          center: { lat: 40.7413549, lng: -73.9980244 },
          zoom: 13
        }}
        onMapLoad={map => {
          var marker = new window.google.maps.Marker({
            position: { lat: 40.7413549, lng: -73.9980244 },
            map: map,
            title: 'Chelsea'
          });
        }}
      />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('app'));