import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



class MapContainer extends Component { 
    state = {
        bounds: {},
        selectedPlace: {},
        likes: '',
        img: '',
        activeMarker: {},
        showingInfoWindow: true
    };

    componentDidMount() {
        this.setBounds();
    }

    setBounds = () => {
        const bounds = new this.props.google.maps.LatLngBounds();
        for (let place of this.props.places) {
            bounds.extend(place.location);
        }
        this.setState({ bounds });
    }

    // FourSquare API get Data functions
    getFourSquareData = (lat, lng, name) => {
        const size = 100;
        this.getFourSquareVenueID(lat, lng, name)
            .then((venueId) => {
                this.getFourSquareVenueInfo(venueId)
                    .then((venueInfo) => {
                        this.setState({
                            likes: venueInfo.likes.count,
                            photo: venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix
                        });
                    })
                    .catch((e) => console.log('Failed request for venue info, Error:', e));
            })
            .catch((e) => console.log('Failed request for venue ID, Error:', e));
    }

    getFourSquareVenueID = (lat, lng, name) => {
        return fetch(`https://api.foursquare.com/v2/venues/search?client_id=E5UCHG55OHFZ2LIQ55W3XTLPVC1411IT1SKV33LG2GN1QX5R&client_secret=IAOLSWF02K2G1F01TYPTMMFUGONS0IMLHMTHH1E3RQ3BFM0U&v=20181101&limit=1&ll=${lat},${lng}&query=${name}`)
            .catch((e) => console.log('Error: ', e))
            .then((response) => response.json())
            .then((response) => response.response.venues[0].id);
    }

    getFourSquareVenueInfo = (venueId) => {
        return fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=X4CMVBAJQSVZYXB45ZGE3GNA43RTCMPQTM4PUIKMQHFYWUVX&client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR&v=20180323`)
            .catch((e) => console.log('Error: ', e))
            .then((response) => response.json())
            .then((response) => response.response.venue);
    }

        onMarkerClick = (props, marker) => {
        // console.log('Marker', marker);
        // console.log('Props', props);
        this.getFourSquareData(props.position.lat, props.position.lng, props.title);
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props
        });
    }

    render() {
        const style = {
            width: '100%',
            height: '100%'
        };
    
        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={style}
                    initialCenter={this.props.centerCoords.location}
                    bounds={this.state.bounds}
                >
                    {this.props.places.map((place, index) =>  
                        <Marker
                            key={index}
                            name={place.name}
                            title={place.name}
                            position={{ lat: place.location.lat, lng: place.location.lng }}
                            onClick={this.onMarkerClick}

                        />
                    )}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <img src={this.state.photo} alt={this.state.selectedPlace.name} />
                            <h3>Likes: {this.state.likes}</h3>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
            
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCVjG1_rpwST332EGF3YRDaSO0ez-ws_aw'
})(MapContainer);