import ReactDom from 'react-dom';
import React, { useState, useEffect, useRef }  from 'react';
import escapeRegExp from 'escape-string-regexp';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import data from './data/park_data.json';
import './app.css';

function App() {
  const [fourSquareData, setFourSquareData] = useState();
  const [todaysDate, setTodaysDate] = useState('');
  const [markers, setMarkers] = useState(data.response.venues);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  console.log(markers)

  useEffect(() => {
      _getTodaysDate();
  }, [])

  // function which returns date string in YYYYMMDD format which is required for the Forsquare API
  const _getTodaysDate = () => {
    let dateTemp = new Date();
    let dateToday = '';

    // Credits given to user113716 on Stackoverflow for getting two digit month and day number
    // https://stackoverflow.com/a/3605248
    dateToday = dateToday.concat(dateTemp.getFullYear(),
      ('0' + (dateTemp.getMonth() + 1)).slice(-2),
      ('0' + dateTemp.getDate()).slice(-2));

    setTodaysDate(dateToday);
  }

  const getData = (e, searchString) => {
    e.preventDefault();
    var clientID = process.env.REACT_APP_FOURSQUARE_API_CLIENT_KEY,
      clientSecret = process.env.REACT_APP_FOURSQUARE_API_CLIENT_SECRET_KEY;

    // fetches park around NYC area, returns ten results max
    fetch(`https://api.foursquare.com/v2/venues/search?ll=40.7508,-73.9890&limit=20&client_id=${clientID}&client_secret=${clientSecret}&query=${searchString}&v=${todaysDate}`)
    // returns response in JSON format
    .then(res => res.json())
    .catch(error => console.log('Error message: ' + error))
    // saves search result in state
    .then(res => {
      setFourSquareData(res);
      console.log(res)})
    // parses new data
    // .then(() => _parseData())
  }

  const _parseData = () => {
    console.log(fourSquareData)
    const foursquareResult = fourSquareData;
    const venues = fourSquareData.response.venues;
    const markerArr = [];
  
    // check if query was successful, which will give us code 200, only then parse through data
      if (foursquareResult.meta.code === 200 && foursquareData.response.venues.length !== 0) {
        // save name, lat and long, and the formatted address of location
        for (let i = 0, l = venues.length; i < l; i++) {
          markerArr[i] = {
            id: venues.id,
            name: venues[i].name,
            location: {
              lat: venues[i].location.lat, 
              lng: venues[i].location.lng 
              },
            address: venues[i].location.address !== undefined ? venues[i].location.address : '',
            city: venues[i].location.city,
            state: venues[i].location.state,
            postalCode: venues[i].location.postalCode
          }
        }
      }

      console.log(markerArr)

    setMarkers(markerArr);
    setFilteredMarkers(markerArr);
  }

  // handles state for selectedMarker from Sidebar
  const handleMarkerClick = (num) => {
    setSelectedMarker(num)
  }

  const handleSideBarToggle = () => {
    setShowSidebar(!showSidebar)
  }

  // filters markers
  const filterResults = (matchString) => {
    let filteredMarkers = {};
    let count = 0;

    // loop through markers and check if any of the markers has a matching location name
    Object.entries(markers).map(function (obj, index) {

      // save title in temp
      let temp = obj[1].title;
      let match = new RegExp(escapeRegExp(matchString), 'i');

      // if match has been found, add marker info into the filtered marker object 'filteredMarkers'
      if (match.test(temp)) {
        filteredMarkers[count] = obj[1];
        count++;
      }
      // to avoid warning in console of using map to loop over markers we are returning null
      return null;
    })
    setFilteredMarkers(filteredMarkers)
  }


  return (
    <div id="main">
      <Sidebar 
        getData={getData}
        markers={markers}
        handleMarkerClick={handleMarkerClick}
        filterResults={filterResults}
        selectedMarker={selectedMarker}
      />
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
        markers={markers}
        handleMarkerClick={handleMarkerClick}
        selectedMarker={selectedMarker}
      />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('app'));