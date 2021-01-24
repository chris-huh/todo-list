import React, { Component, createRef } from 'react';

class App extends Component {
	/* Setup */
	constructor(props) {
		super(props);
		this.state = { todos: [], mirror: '' };
		this.inputField = createRef();
	}
	// or in ES6
	// state = { todos: [] };
	/* End of Setup */

	async componentDidMount() {
		console.log('Mounted');
		const res = await fetch('http://localhost:5000/todos');
		const json = await res.json();
		this.setState({ todos: json });
	}

	handleInputSubmit = async e => {
		e.preventDefault();

		const todo = this.inputField.current.value;
		const res = await fetch('http://localhost:5000/todos', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ todo }),
		});
		const updatedTodos = await res.json();
		this.setState({ todos: updatedTodos, mirror: '' }); // response should be existing + new todo added
		this.inputField.current.value = null;
	};

	handleOnChange = e => {
		this.setState({ mirror: e.target.value });
	};

	render() {
		const items = this.state.todos.map((item, index) => {
			return <li key={index}>{item}</li>;
		});

		return (
			<div>
				<form onSubmit={this.handleInputSubmit}>
					<ul>
						{items}
						To be added: {this.state.mirror}
					</ul>
					<input type='text' ref={this.inputField} onChange={this.handleOnChange} />
				</form>
			</div>
		);
	}
}

export default App;
