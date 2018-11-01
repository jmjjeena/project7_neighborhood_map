import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';

class App extends Component {

  state = {
    places: [
      {
        name: "Civic Center",
        location: {
          lat: 37.775073,
          lng: -122.419457
        }
      },
      {
        name: "Golden Gate Bridge",
        location: {
          lat: 37.820128,
          lng: -122.478277
        }
      },
      {
        name: "The Walt Disney Family Museum",
        location: {
          lat: 37.801612,
          lng: -122.458613
        }
      },
      {
        name: "PIER 39",
        location: {
          lat: 37.808695,
          lng: -122.409818
        }
      },
      {
        name: "Twin Peaks",
        location: {
          lat: 37.754438,
          lng: -122.446777
        }
      },
      {
        name: "San Francisco Museum of Modern Art",
        location: {
          lat: 37.785746,
          lng: -122.401056 
        }
      },
      {
        name: "Baker Beach",
        location: {
          lat: 37.791383,
          lng: -122.485113
        }
      },
    ]
  };
  render() {
    return (
      <div className="App">
        <MapContainer places={this.state.places}/>
      </div>
    );
  }
}

export default App;
