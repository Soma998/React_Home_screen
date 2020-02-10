import React, { Component } from 'react';
import './App.css';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';

import Weather from './components/Weather';
import Time from './components/Time';
import Quote from './components/Quote';
import UserName from './components/UserName';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

export class App extends Component {
	state = { backgroundImage: '', greeting: '', loading: true };

	componentDidMount = () => {
		const hour = new Date().getHours();
		const randomView = Math.floor(Math.random() * 3);
		const keyword = ['city', 'nature', 'view'];

		if (hour === 6) {
			this.FetchBackground('blue-hour', keyword[randomView]);
			this.setState({ greeting: 'Jó reggelt, ' });
		} else if (hour >= 6 && hour < 8) {
			this.FetchBackground('sunrise', keyword[randomView]);
			this.setState({ greeting: 'Jó reggelt, ' });
		} else if (hour >= 8 && hour < 10) {
			this.FetchBackground('morning', keyword[randomView]);
			this.setState({ greeting: 'Jó reggelt, ' });
		} else if (hour >= 10 && hour < 13) {
			this.FetchBackground('day', keyword[randomView]);
			this.setState({ greeting: 'Szép napot, ' });
		} else if (hour <= 12 && hour < 17) {
			this.FetchBackground('afternoon', keyword[randomView]);
			this.setState({ greeting: 'Szép napot, ' });
		} else if (hour >= 17 && hour <= 18) {
			this.FetchBackground('sunset', keyword[randomView]);
			this.setState({ greeting: 'Jó estét, ' });
		} else if (hour > 18) {
			this.FetchBackground('night', keyword[randomView]);
			this.setState({ greeting: 'Jó estét, ' });
		} else {
			this.FetchBackground('day', keyword[randomView]);
			this.setState({ greeting: 'Üdv, ' });
		}
		setTimeout(() => {
			this.setState({ loading: false });
		}, 4000);
	};

	FetchBackground = async (time, view) => {
		const API = {
			url: 'https://api.unsplash.com/photos/random/',
			client_id:
				'cc4d61c1c6206325a1dbee4bcf67fc08d3b93fec3af25957477842ca2d49413d',
			orientation: 'landscape'
		};
		await fetch(
			`${API.url}?client_id=${API.client_id}&orientation=${API.orientation}&query=${time}-${view}`
		)
			.then(response => response.json())
			.then(result =>
				this.setState({ backgroundImage: result.urls.full })
			);
	};
	loading = () => {
		this.setState({ loading: false });
	};

	render() {
		if (this.state.loading) {
			return (
				<div className='loading'>
					<RingLoader
						css={override}
						size={100}
						color={'#6666ff'}
						loading={this.state.loading}
					/>
				</div>
			);
		} else {
			return (
				<div
					className='App'
					style={{
						backgroundImage: `url(${this.state.backgroundImage})`
					}}
				>
					<div className='centered'>
						<Time />
						<UserName greeting={this.state.greeting} />
						<Quote />
					</div>
					<div className='right'>
						<Weather />
					</div>
				</div>
			);
		}
	}
}

export default App;
