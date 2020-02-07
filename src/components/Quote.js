import React, { Component } from 'react';

export class Quote extends Component {
	state = { quote: '' };
	async componentDidMount() {
		await fetch('https://api.adviceslip.com/advice')
			.then(response => response.json())
			.then(result => this.setState({ quote: result.slip.advice }));
	}
	render() {
		return <div className='quote'>"{this.state.quote}"</div>;
	}
}

export default Quote;
