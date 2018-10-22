import React, { Component } from 'react';
import './App.css';
import GoogleMap from './components/GoogleMap.js';
import SideBar from './components/Sidebar.js';
import data from './data/park_data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // forsquareResult holds the saved and imported json reponse
      foursquareResult: data,
      // markers is an object of all the markers
      markers: {},
      // object with one marker which gets updated from chil components
      selectedMarker: null,
      date: ''
    };
  }

  componentWillMount() {
    this.getTodaysDate();
    this.parseData();
  }

  // function which returns date string in YYYYMMDD format which is required for the Forsquare API
  getTodaysDate = () => {
    var dateTemp = new Date();
    var dateToday = '';
    // Credits given to user113716 on Stackoverflow for getting two digit month and day number
    // https://stackoverflow.com/a/3605248
    dateToday = dateToday.concat(dateTemp.getFullYear(),
      ('0' + (dateTemp.getMonth() + 1)).slice(-2),
      ('0' + dateTemp.getDate()).slice(-2));
    this.setState({ date: dateToday })
  }


  getData = (searchString) => {
    var result = '',
        clientID = process.env.REACT_APP_FOURSQUARE_API_CLIENT_KEY,
        clientSecret = process.env.REACT_APP_FOURSQUARE_API_CLIENT_SECRET_KEY;

    // fetches park around NYC area, returns ten results max
    fetch('https://api.foursquare.com/v2/venues/search?ll=40.7508,-73.9890&limit=10&client_id='+ clientID 
      +'&client_secret=' + clientSecret + '&query=' + searchString + '&v=' + this.state.date)
    // returns response in JSON format
    .then(res => res.json())
    .catch(error => console.log('Error!'))
    // saves search result in state
    .then(foursquareResult => this.setState({ foursquareResult }))
    // parses new data
    .then(() => this.parseData())
  }

  parseData = () => {
  const foursquareData = this.state.foursquareResult, 
        venues = this.state.foursquareResult.response.venues,
        markerObj = {};

  // check if query was successful, which will give us code 200, only then parse through data
    if (foursquareData.meta.code === 200  && this.state.foursquareResult !== undefined) {
      // save name, lat and long, and the formatted address of location
      for (let i = 0; i < venues.length; i++) {
        markerObj[i] = { 
          title: venues[i].name,
          location: {
            lat: venues[i].location.lat, 
            lng: venues[i].location.lng 
            },
          address: venues[i].location.address,
          city: venues[i].location.city,
          state: venues[i].location.state,
          zip: venues[i].location.postalCode
        }
      }
    }
    this.setState({ markers: markerObj});
  }

  // handles state for selectedMarker from Sidebar
  handleMarkerClick = (num) => {
    this.setState({ selectedMarker: num });
  }

  render() {
    return (
      <div className="App">
        <SideBar 
          markers={this.state.markers} 
          selectedMarker={this.state.selectedMarker}
          handleMarkerClick={this.handleMarkerClick}
          getData={this.getData}
        />
        <GoogleMap 
          markers={this.state.markers} 
          selectedMarker={this.state.selectedMarker} 
          handleMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default App;
