import React, { Component } from 'react';
import '../App.css';

class MapNav extends Component {
    render() {
        return (
            <nav className="map-nav">
                <div className="hamburger-container">
                    <div className="hamburger-bar"></div>
                    <div className="hamburger-bar"></div>
                    <div className="hamburger-bar"></div>
                </div>
                <h1 className="nav-title">Must See San Francisco Attractions</h1>
            </nav>
        )
    }
}
export default MapNav;