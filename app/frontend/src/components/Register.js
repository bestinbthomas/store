import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth_action';
import { showMessage } from '../actions/message';

class Register extends Component {
	state = {
		username  : '',
		email     : '',
		password  : '',
		password2 : ''
	};

	initialstate = {
		username  : '',
		email     : '',
		password  : '',
		password2 : ''
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { username, email, password, password2 } = this.state;
		if (password !== password2) {
			this.props.showMessage('passwords do not match');
			return;
		}

		this.props.registerUser({ username, email, password });
		this.setState(this.initialstate);
	};

	onChange = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	};

	render() {
		const { username, email, password, password2 } = this.state;
		return (
			<div className="col-md-6 m-auto">
				<div className="card card-body mt-5">
					<h2 className="text-center">Register</h2>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								className="form-control"
								name="username"
								onChange={this.onChange}
								value={username}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								onChange={this.onChange}
								value={email}
							/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input
								type="password"
								className="form-control"
								name="password"
								onChange={this.onChange}
								value={password}
							/>
						</div>
						<div className="form-group">
							<label>Confirm Password</label>
							<input
								type="password"
								className="form-control"
								name="password2"
								onChange={this.onChange}
								value={password2}
							/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary">
								Register
							</button>
						</div>
						<p>
							Already have an account? <Link to="/login">Login</Link>
						</p>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated : state.isAuthenticated
});
export default connect(mapStateToProps, { registerUser, showMessage })(Register);
