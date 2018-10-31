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
      }
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
