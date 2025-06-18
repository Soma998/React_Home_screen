import React, { Component } from 'react';
import './App.css';
import { css } from '@emotion/core';
import MoonLoader from 'react-spinners/MoonLoader';

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
	state = { backgroundImage: '', greeting: '', loading: true, isDarkMode: true };

	toggleTheme = () => {
		this.setState(prevState => ({
		  isDarkMode: !prevState.isDarkMode
		}))};
	


	componentDidMount = () => {
		const hour =11;
		//const hour = new Date().getHours();
		const views = ['city', 'nature', 'view'];
		const randomView = Math.floor(Math.random() * views.length);

		if (hour === 6) {
			this.fetchBackground('blue-hour', views[randomView]);
			this.setState({ greeting: 'Jó reggelt, ' });
		} else if (hour >= 6 && hour < 8) {
			this.fetchBackground('sunrise', views[randomView]);
			this.setState({ greeting: 'Jó reggelt, ' });
		} else if (hour >= 8 && hour < 10) {
			this.fetchBackground('morning', views[randomView]);
			this.setState({ greeting: 'Jó reggelt, ' });
		} else if (hour >= 10 && hour < 13) {
			this.fetchBackground('day', views[randomView]);
			this.setState({ greeting: 'Szép napot, ' });
		} else if (hour >= 12 && hour < 17) {
			this.fetchBackground('afternoon', views[randomView]);
			this.setState({ greeting: 'Szép napot, ' });
		} else if (hour >= 17 && hour <= 18) {
			this.fetchBackground('sunset', views[randomView]);
			this.setState({ greeting: 'Jó estét, ' });
		} else if (hour > 18) {
			this.fetchBackground('night', views[randomView]);
			this.setState({ greeting: 'Jó estét, ' });
		} else {
			this.fetchBackground('day', views[randomView]);
			this.setState({ greeting: 'Üdv, ' });
		}
		setTimeout(() => {
			this.setState({ loading: false });
		}, 4000);
	};

	fetchBackground = async (time, view) => {
    const API = {
      url: 'https://api.unsplash.com/photos/random/',
      client_id: 'cc4d61c1c6206325a1dbee4bcf67fc08d3b93fec3af25957477842ca2d49413d',
      orientation: 'landscape'
    };

    try {
      const response = await fetch(
        `${API.url}?client_id=${API.client_id}&orientation=${API.orientation}&query=${time}-${view}`
      );
      const result = await response.json();
	  console.log(result);

      const img = new Image();
      img.src = result.urls.full;

      img.onload = () => {
        this.setState({
          backgroundImage: result.urls.full,
          loading: false
        });
      };

      img.onerror = () => {
        console.error('Failed to load image.');
        this.setState({ loading: false });
      };
    } catch (err) {
      console.error('API error:', err);
      this.setState({ loading: false });
    }
  };

  

	render() {
		if (this.state.loading) {
			return (
				<div className='loading'>
					<MoonLoader
						css={override}
						size={100}
						color={'rgb(55 65 81)'}
						loading={this.state.loading}
					/>
				</div>
			);
		} else {
			return (
				<div
					className='App'
					style={{
						backgroundImage: `url(${this.state.backgroundImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						width: '100%',
						height: '100vh',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						color: this.state.isDarkMode ? '#fff' : '#111',
        				textShadow: this.state.isDarkMode ? '0 0 5px #000' : '0 0 2px #fff',
						transition: 'color 0.3s ease, background-color 0.3s ease'
					}}
				>
					<button
							onClick={this.toggleTheme}
							style={{
								position: 'absolute',
								bottom: 20,
								left: 20,
								background: 'rgba(0, 0, 0, 0.4)',
								border: 'none',
								color: '#fff',
								padding: '10px 15px',
								cursor: 'pointer',
								borderRadius: '8px',
								backdropFilter: 'blur(5px)'
							}}
							>
							{this.state.isDarkMode ? 'Light Mode' : 'Dark Mode'}
					</button>
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
