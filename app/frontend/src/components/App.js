import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import { Provider } from 'react-redux';
import store from '../store/store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<Nav />
				</div>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
