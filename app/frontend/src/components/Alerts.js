import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert'
import {connect} from 'react-redux'

export class Alert extends Component {
    componentDidUpdate(prev) {
        const {error, alert, message} = this.props;
        if (error !== prev.error) {
            if (error.msg) {
                for (let key in error.msg) {
                    if (key.toLowerCase() !== 'non_field_errors')
                        alert.error(`${key}: ${error.msg[key]}`);
                    else
                        alert.error(`${error.msg[key]}`);
                }
            }
        }
        if (message !== prev.message) {
            alert.show(message.msg)
        }
    }

    render() {
        return <Fragment/>
    }
}

const mapstatetoprops = state => ({
    error: state.error,
    message: state.message
});

export default connect(mapstatetoprops)(withAlert()(Alert));