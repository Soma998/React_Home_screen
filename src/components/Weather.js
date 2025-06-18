import React, { Component } from 'react';

export class Weather extends Component {
	state = { error: '', weather: '', city: '', description: '' };

	componentDidMount() {
		const API = {
			url: 'https://api.openweathermap.org/data/2.5/weather',
			client_key: '61eef50929f5f95b0873b6ab8c79f5cc',
		}
		navigator.geolocation.getCurrentPosition(
			async (position) => {
			  try {
				const response = await fetch(
				  `${API.url}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=hu&APPID=${API.client_key}`
				);
		  
				const result = await response.json();
				console.log(result.main);
		  
				if (!response.ok) {
				  // API returned an error (e.g., invalid key, bad request)
				  this.setState({ error: result.message || 'API error' });
				  return;
				}
		  
				if (!result.main || !result.weather || !result.weather[0]) {
				  // The expected data isn't there
				  this.setState({ error: 'Unexpected API response structure' });
				  return;
				}
		  
				this.setState({
				  weather: Math.round(result.main.temp) + '°C',
				  city: result.name,
				  description: result.weather[0].description
				});
			  } catch (error) {
				this.setState({ error: error.message });
			  }
			},
		  );
	}

	render() {
		if (!this.state.error && this.state.weather !== undefined) {
			return (
				<div className='weather'>
					<h2>{this.state.weather}</h2>
					<h3>{this.state.city}</h3>
					<h3>{this.state.description}</h3>
				</div>
			);
		} else {
			return <div>Nem érhető el a pozíciója</div>;
		}
	}
}

export default Weather;
