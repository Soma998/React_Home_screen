import React, { Component } from 'react';

export class Time extends Component {
	state = { time: '', date: '' };
	componentDidMount() {
		setInterval(() => {
			this.setState({ time: new Date().toLocaleTimeString() });
		}, 1000);
		this.setState({ date: this.dateBuilder(new Date()) });
	}
	dateBuilder = datenow => {
		let months = [
			'Január',
			'Február',
			'Március',
			'Április',
			'Május',
			'Június',
			'Július',
			'Augusztus',
			'Szeptember',
			'Október',
			'November',
			'December'
		];
		let days = [
			'Vasárnap',
			'Hétfő',
			'Kedd',
			'Szerda',
			'Csütörtök',
			'Péntek',
			'Szombat'
		];

		let day = days[datenow.getDay()];
		let date = datenow.getDate();
		let month = months[datenow.getMonth()];
		let year = datenow.getFullYear();

		return ` ${year}. ${month} ${date}. ${day}`;
	};

	render() {
		return (
			<div className='time'>
				<h1>{this.state.time}</h1>
				<h3>{this.state.date}</h3>
			</div>
		);
	}
}

export default Time;
