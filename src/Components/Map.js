import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
export class Map extends Component {
    render() {
        return (
            <div id="map">Map</div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCVjG1_rpwST332EGF3YRDaSO0ez-ws_aw'
})(Map)