import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


class MapContainer extends Component { 

    state = {
        bounds: {},
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
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

    getFourSquareData = (lat, lng, name) => {
        this.getFourSquareVenueID(lat, lng, name).then((venueId) => {
            this.getFourSquareVenueInfo(venueId).then((venueInfo) => {
                console.log(venueInfo);
            });
        });
    }

    getFourSquareVenueID = (lat, lng, name) => {
        return fetch(`https://api.foursquare.com/v2/venues/search?client_id=E5UCHG55OHFZ2LIQ55W3XTLPVC1411IT1SKV33LG2GN1QX5R&client_secret=IAOLSWF02K2G1F01TYPTMMFUGONS0IMLHMTHH1E3RQ3BFM0U&v=20181101&limit=1&ll=${lat},${lng}&query=${name}`)
            .then((response) => response.json())
            .then((response) => response.response.venues[0].id);
    }

    getFourSquareVenueInfo = (venueId) => {
        return fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=X4CMVBAJQSVZYXB45ZGE3GNA43RTCMPQTM4PUIKMQHFYWUVX&client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR&v=20180323`)
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
            <Map
                google={this.props.google}
                zoom={14}
                style={style}
                initialCenter={this.props.places[0].location}
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
                    </div>
                </InfoWindow>
            </Map>
            
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCVjG1_rpwST332EGF3YRDaSO0ez-ws_aw'
})(MapContainer);