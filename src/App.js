import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import CurrentLocation from './Map';
import CurrentWeather from './Weather';
import './App.scss';

export class MapContainer extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentLocation: {
  //       lat: null,
  //       lng: null
  //     }
  //   };
  //   if (navigator && navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(pos => {
  //       const coords = pos.coords;
  //       this.setState({
  //         currentLocation: {
  //           lat: coords.latitude,
  //           lng: coords.longitude
  //         }
  //       });
  //     });
  //   }
  // }

  render() {
    return (
      <div>
      <CurrentLocation centerAroundCurrentLocation google={this.props.google} >
      </CurrentLocation>
      <CurrentWeather></CurrentWeather>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBeuypSePUX4Er0WAo7os47hCVGuuQu3eQ'
})(MapContainer);
