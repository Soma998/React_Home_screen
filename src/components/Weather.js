import React, { Component } from 'react';

export class Weather extends Component {
	state = { error: '', weather: '', city: '', description: '' };

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			async position => {
				await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=hu&APPID=61eef50929f5f95b0873b6ab8c79f5cc`
				)
					.then(response => response.json())
					.then(result =>
						this.setState({
							weather: Math.round(result.main.temp) + '°C',
							city: result.name,
							description: result.weather[0].description
						})
					);
			},
			error => this.setState({ error: error.message })
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
