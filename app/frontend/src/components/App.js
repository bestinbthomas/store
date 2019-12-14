import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {Provider} from 'react-redux';

import Nav from './Nav';
import Alert from './Alerts'
import Suppliers from './Suppliers';
import Items from './Items';
import Invoices from './Invoices';
import AddInvoice from './AddInvoice';
import store from '../store/store';
import Login from './Login'
import Register from './Register'
import PrivateRoute from "./PrivateRoute";
import {loadUser} from '../actions/auth_action'

const alertOptions = {
    timeout: 2000,
    position: 'top center'
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <AlertProvider template={AlertTemplate} {...alertOptions}>
                        <div>
                            {/*<PrivateRoute path="/" component={Nav}/>*/}
                            <Nav/>
                            <Alert/>
                            <PrivateRoute exact path="/" component={AddInvoice}/>
                            <Route exact path="/login" component={Login}/>
                            <PrivateRoute exact path="/register" component={Register}/>
                            <PrivateRoute path="/suppliers" component={Suppliers}/>
                            <PrivateRoute path="/items" component={Items}/>
                            <PrivateRoute path="/invoices" component={Invoices}/>
                        </div>
                    </AlertProvider>
                </Provider>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
