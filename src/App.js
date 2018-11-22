import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import CurrentLocation from './Map';
import './App.scss';

export class MapContainer extends Component {

  render() {
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google} >
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBeuypSePUX4Er0WAo7os47hCVGuuQu3eQ'
})(MapContainer);
