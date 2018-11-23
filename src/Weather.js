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

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.currentLocation.lat}&lon=${this.state.currentLocation.lng}&appid=${API_KEY}&lang=pl&units=metric`)
      .then(response => response.json())
      .then(json => this.setState({ currentWeather: json, isFetching: false}));
  }

  render() {

    if (this.state.currentWeather) {
      return (
        <div className='weather'>
          <div>
            <h1><span>Niebezpieczeństwo</span></h1>
            <h2>Lepiej nie wychodź!</h2>
          </div>
          <h2>{this.state.currentWeather.name}</h2>
          <h1><span style={{
            color: this.state.currentWeather.weather[0].id === 800 && this.state.currentWeather.weather[0].id === 801 ? 'green':
            this.state.currentWeather.weather[0].id >= 802 ? 'yellow' : 'red'
          }}>{this.state.currentWeather.weather[0].description}</span></h1>
          <div>
          <h3>Temp: <span style={{
              color: this.state.currentWeather.main.temp >= 13 && this.state.currentWeather.main.temp <= 23 ? 'green':
              this.state.currentWeather.main.temp >= 11 && this.state.currentWeather.main.temp <= 25 ? 'yellow' : 'red'
            }}>{this.state.currentWeather.main.temp}°C</span></h3>
            <h3>Ciśnienie: <span style={{
              color: this.state.currentWeather.main.pressure >= 1000 && this.state.currentWeather.main.pressure <= 1016 ? 'green':
              this.state.currentWeather.main.pressure >= 998 && this.state.currentWeather.main.pressure <= 1018 ? 'yellow' : 'red'
            }}>{this.state.currentWeather.main.pressure}hPa</span></h3>
            <h3>Wilgotność: <span style={{
              color: this.state.currentWeather.main.humidity >= 40 && this.state.currentWeather.main.humidity <= 60 ? 'green':
              this.state.currentWeather.main.humidity >= 38 && this.state.currentWeather.main.humidity <= 62 ? 'yellow' : 'red'
            }}>{this.state.currentWeather.main.humidity}%</span></h3>
          </div>
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
