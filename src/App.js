import React, { Component } from 'react';
import './App.css';
import GoogleMap from './components/GoogleMap.js';
import data from './data/park_data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      foursquareResult: data,
      markers: {}
    };
  }

  // TODO: find better place in order to avoid costly rerendering of app
  componentDidMount() {
    // var date = dateToday(),
    //     clientID = 'YCYZUTP251E4PE1YMCXMQAAQLQDSQ3R5AB42WBHYADT2DXAC',
    //     clientSecret = 'PCWDZDIZJQNJBYIMWNVNPM3OQILTKEZNDE1E5HA3VCFNG0RA';

    // // fetches park around NYC area, returns ten results max
    // fetch('https://api.foursquare.com/v2/venues/search?ll=40.7508,-73.9890&limit=10&categoryId=4bf58dd8d48988d163941735&client_id='+ clientID 
    //   +'&client_secret=' + clientSecret + '&v=' + date)
    // .then((response) => {
    //   this.setState({foursquareResult: response})
    // });
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
          address: venues[i].location.formattedAddress
        }
      }
    }
    this.setState({ markers: markerObj});
  }

  render() {
    return (
      <div className="App">
        <GoogleMap locations={this.state.markers}/>
      </div>
    );
  }
}

export default App;


// function which returns date string in YYYYMMDD format which is required for the Forsquare API
// function dateToday() {
//   var dateTemp = new Date();
//   var dateToday = '';
//   // Credits given to user113716 on Stackoverflow for getting two digit month and day number
//   // https://stackoverflow.com/a/3605248
//   dateToday = dateToday.concat(dateTemp.getFullYear(), 
//                               ('0' + (dateTemp.getMonth() + 1)).slice(-2), 
//                               ('0' + dateTemp.getDate()).slice(-2));
//   return dateToday;
// }

