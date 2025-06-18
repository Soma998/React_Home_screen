import React, { Component } from 'react';

export class UserName extends Component {
	constructor(props) {
		super(props);
		this.state = { name: '', focus: '' };

		this.NameRef = React.createRef();
		this.FocusRef = React.createRef();
	}

	componentDidMount = () => {
		this.setState({
			name: localStorage.getItem('name') || undefined,
			focus: localStorage.getItem('focus') || undefined
		});
	};

	handleNameBlur = () => {
		localStorage.setItem('name', this.NameRef.current.innerText);
	};

	handleFocusBlur = () => {
		localStorage.setItem('focus', this.FocusRef.current.innerText);
	};

	render() {
		return (
			<div>
				<h2>
					<span>{this.props.greeting} </span>
					<span
						contentEditable='true'
						suppressContentEditableWarning={true}
						ref={this.NameRef}
						onBlur={this.handleNameBlur}
					>
						{typeof this.state.name != 'undefined'
							? localStorage.getItem('name')
							: 'Ide add meg a neved és kattints ki a mezőből'}
					</span>
				</h2>
			
			</div>
		);
	}
}

export default UserName;
