import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';

class App extends Component {

  state = {
    places: [
      {
        title: "My Home",
        location: {
          lat: 37.974542,
          lng: -122.278016
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
