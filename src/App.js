import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer';
import MapNav from "./components/MapNav";

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
    ],
    currentPlaces: []
  };

  componentDidMount() {
    this.setState({ currentPlaces: this.state.places });
  }
  filterPlaces = (query) => {
    if (!query) {
      this.setState({ currentPlaces: [] });
    }
    const filteredPlaces = this.state.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
    console.log(filteredPlaces);
    this.setState({ currentPlaces: filteredPlaces });
  }

  setActiveMarker = (marker) => {
    console.log(marker);
    document.querySelector(`[title="${marker}"]`).click();
  }

  render() {
    return (
      <div className="App">
        <MapNav places={this.state.currentPlaces} onQuery={this.filterPlaces} setActiveMarker={this.setActiveMarker} />
        <MapContainer places={this.state.currentPlaces} centerCoords={this.state.places[0].location} activeMarker={this.state.activeMarker} showingInfoWindow={this.state.showingInfoWindow} /> 
      </div>
    );
  }
}

export default App;
