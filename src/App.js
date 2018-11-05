import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer';
import MapNav from "./components/MapNav";
import * as FourSquareAPI from './APIs/FourSquare';

class App extends Component {

  state = {
    places: [
      {
        name: "Civic Center",
        location: {
          lat: 37.775073,
          lng: -122.419457
        },
        img: '',
        likes: ''
      },
      {
        name: "Golden Gate Bridge",
        location: {
          lat: 37.820128,
          lng: -122.478277
        },
        img: '',
        likes: ''
      },
      {
        name: "The Walt Disney Family Museum",
        location: {
          lat: 37.801612,
          lng: -122.458613
        },
        img: '',
        likes: ''
      },
      {
        name: "PIER 39",
        location: {
          lat: 37.808695,
          lng: -122.409818
        },
        img: '',
        likes: ''
      },
      {
        name: "Twin Peaks",
        location: {
          lat: 37.754438,
          lng: -122.446777
        },
        img: '',
        likes: ''
      },
      {
        name: "San Francisco Museum of Modern Art",
        location: {
          lat: 37.785746,
          lng: -122.401056 
        },
        img: '',
        likes: ''
      },
      {
        name: "Baker Beach",
        location: {
          lat: 37.791383,
          lng: -122.485113
        },
        img: '',
        likes: ''
      },
    ],
    currentPlaces: []
  };

  componentDidMount() {
    this.getFourSquareData();
  }

  // Fetch FourSquare data from API
  getFourSquareData = () => {
    const newPlaces = this.state.places.map((place) => {
      const size = 150
      FourSquareAPI.getFourSquareVenueID(place.location.lat, place.location.lng, place.name)
        .then((venueId) => {
          FourSquareAPI.getFourSquareVenueInfo(venueId)
            .then((venueInfo) => {
              place.likes = venueInfo.likes.count
              place.img = venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix
            })
            .catch(() => this.setState({ requestAvailable: false })
            )
        })
        .catch((e) => alert(e));
      return place;
    });
    this.setState({ currentPlaces: newPlaces });
  }

   // Filter a new array of current places based on user query
  filterPlaces = (query) => {
    if (!query) {
      this.setState({ currentPlaces: [] });
    }
    const filteredPlaces = this.state.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
    console.log(filteredPlaces);
    this.setState({ currentPlaces: filteredPlaces });
  }

  // Set active marker when clicking list item
  setActiveMarker = (marker) => {
    console.log(marker);
    document.querySelector(`[title="${marker}"]`).click();
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <MapNav places={this.state.currentPlaces} onQuery={this.filterPlaces} setActiveMarker={this.setActiveMarker} />
        <MapContainer places={this.state.currentPlaces} centerCoords={this.state.places[0].location} activeMarker={this.state.activeMarker} showingInfoWindow={this.state.showingInfoWindow} /> 
      </div>
    );
  }
}

export default App;
