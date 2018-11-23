import React, { Component } from 'react';
import './Weather.scss';

const API_KEY = 'f67085f7e369082f71e4963e5d32c8e1';

export class CurrentWeather extends Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      currentWeather: null,
      isFetching: false
    };
  }

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
      });
    }
    this.getWeather();

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.getWeather();
    }
  }

  getWeather = () => {
    this.setState({ isFetching: true});

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.currentLocation.lat}&lon=${this.state.currentLocation.lng}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(json => this.setState({ currentWeather: json, isFetching: false}));
      // .then(json => console.log(json))
    console.log(this.state.currentLocation)
    console.log(this.state.currentWeather)
  }

  render() {
    const { data } = this.state;
    console.log(data)
    if (this.state.currentWeather) {
      return (
        <div className='weather'>
          <h2>name - {this.state.currentWeather.name}</h2>
          <h1>{this.state.currentWeather.weather[0].description}</h1>
          <h3>pressure - {this.state.currentWeather.main.pressure}</h3>
          <h3>temp - {this.state.currentWeather.main.temp}</h3>
          <h3>humidity - {this.state.currentWeather.main.humidity}</h3>
        </div>
      )
    } else {
      return null
    }
  }
}

export default CurrentWeather;

CurrentWeather.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -34.397,
    lng: 150.644
  },
  centerAroundCurrentLocation: false,
  visible: true
};
