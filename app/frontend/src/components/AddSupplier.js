import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSupplier } from '../actions/suppliers_actions';

class AddSupplier extends Component {
	initialstate = {
		name    : '',
		contact : '',
		GSTNo   : ''
	};
	state = {
		name    : '',
		contact : '',
		GSTNo   : ''
	};
	handleOnChange = (e) => {
		const st = {
			...this.state
		};

		st[e.target.id] = e.target.value;
		this.setState(st);
	};
	handleOnSubmit = (e) => {
		e.preventDefault();
		this.props.addSupplier({ ...this.state });
		this.setState(this.initialstate);
	};
	render() {
		return (
			<div>
				<form className="form-horizontal" onChange={this.handleOnChange} onSubmit={this.handleOnSubmit}>
					<div className="form-group">
						<label className="p-1 control-label col-sm-2" htmlfor="name">
							Name :{' '}
						</label>
						<input type="text" className="form-control " id="name" value={this.state.name} />
					</div>
					<div className="form-group">
						<label className="p-1 control-label col-sm-2" htmlfor="contact">
							Contact :{' '}
						</label>
						<input
							type="text"
							step="0.01"
							className="form-control "
							id="contact"
							value={this.state.contact}
						/>
					</div>
					<div className="form-group">
						<label className="p-1 control-label col-sm-2" htmlfor="GSTNo">
							GST Number :{' '}
						</label>
						<input
							type="number"
							step="0.01"
							className="form-control "
							id="GSTNo"
							value={this.state.GSTNo}
						/>
					</div>
					<div className="d-flex justify-content-center">
						<input type="submit" className="btn btn-dark" value="Confirm Add" />
					</div>
				</form>
			</div>
		);
	}
}

export default connect(() => {}, { addSupplier })(AddSupplier);
