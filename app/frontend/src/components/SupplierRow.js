import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { modifySupplier } from '../actions/suppliers_actions';

class SupplierRow extends Component {
	state = { ...this.props.supplier };
	handleChange = (e) => {
		const s = { ...this.state };
		s[e.target.id] = e.target.value;
		this.setState(s);
	};
	save = (e) => {
		this.props.modifySupplier(this.state);
	};
	render() {
		if (this.props.supplier.name !== this.state.name) this.setState({ ...this.props.supplier });
		return (
			<tr>
				<td>
					<input onChange={this.handleChange} type="text" id="name" value={this.state.name} />
				</td>
				<td>
					<input onChange={this.handleChange} type="text" id="contact" value={this.state.contact} />
				</td>
				<td>
					<input onChange={this.handleChange} type="text" id="GSTNo" value={this.state.GSTNo} />
				</td>
				<td>
					<button type="button" onClick={this.save} className="btn btn-primary">
						save
					</button>
				</td>
				<td>
					<button
						type="button"
						onClick={(e) => this.props.delete(this.state.name)}
						className="btn btn-danger"
					>
						delete
					</button>
				</td>
			</tr>
		);
	}
}

export default connect(() => {}, { modifySupplier })(SupplierRow);
