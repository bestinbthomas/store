import React ,{Component}from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect, Fragment} from "react-redux"
import {logoutUser} from "../actions/auth_action";

class Nav extends Component {
render() {
    const {isAuthenticated, user} = this.props.auth;
    const authLinks1 = (
            <ul className="navbar-nav mr-auto">
                <li className='nav-item'>
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/suppliers">
                        Suppliers
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/items">
                        Items
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/invoices">
                        Invoices
                    </Link>
                </li>
            </ul>
        );
    const authLinks2 = (
            <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
                <span className="navbar-text mr-3">
                    <strong>
                        {user ? `Welcome ${user.username} :`:""}
                    </strong>
                </span>
                <li>
                    <button className="nav-link btn btn-dark" onClick={this.props.logoutUser}>LogOut</button>
                </li>
                <li>
                    <Link to="/register" className="nav-link ml-4">Add New User</Link>
                </li>
            </ul>
    );

    const guestLinks = (
        <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
            <li>
                <Link to="/login" className="nav-link">Login</Link>
            </li>
        </ul>
    )
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className='container'>
                <a className="navbar-brand" href="#">
                    2k Market
                </a>
                <button
                    className="navbar-toggler collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="navbar-collapse collapse" id="navbarColor01">
                    {isAuthenticated? authLinks1 : <span/>}
                    {isAuthenticated? authLinks2 : guestLinks}
                </div>
            </div>
        </nav>
    );
}
};

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps,{logoutUser})(Nav)