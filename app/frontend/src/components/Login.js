import React, {Component} from 'react';
import {connect} from 'react-redux'
import {loginUser} from "../actions/auth_action";
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        username: "",
        password: "",
    };

    onSubmit = (e) => {
        e.preventDefault()
        this.props.loginUser(this.state.username,this.state.password)
    };

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        })
    };

    render() {
        if(this.props.isAuthenticated)
            return <Redirect to="/"/>;
        const {username, password} = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
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
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{loginUser})(Login);