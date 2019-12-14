import React, { Component } from 'react';
import { connect } from 'react-redux';
import { additem } from '../actions/items_actions';

class AddItem extends Component {
	initialstate = {
		margin       : 0,
		name         : '',
		articleNo    : 0,
		BasePrice    : 0,
		MRP          : 0,
		GST          : 0,
		AgreedMargin : 0
	};

	state = {
		margin       : 0,
		name         : '',
		articleNo    : 0,
		BasePrice    : 0,
		MRP          : 0,
		GST          : 0,
		AgreedMargin : 0
	};
	handleOnChange = (e) => {
		const st = {
			...this.state
		};

		if (e.target.id === 'name') st[e.target.id] = e.target.value;
		else st[e.target.id] = parseFloat(e.target.value);
		st.margin = Math.round((st.MRP - st.BasePrice * (1 + st.GST)) / st.MRP * 100) / 100;
		this.setState(st);
	};

	handleOnSubmit = (e) => {
		e.preventDefault();
		const item = {
			...this.state
		};
		this.props.additem(item);
		this.setState(this.initialstate);
	};
	render() {
		let mystyle = {};
		if (this.state.margin < this.state.AgreedMargin) mystyle = { color: 'red' };
		return (
			<div>
				<form className="form-horizontal" onChange={this.handleOnChange} onSubmit={this.handleOnSubmit}>
					<div className="form-group">
						<label className="p-1 control-label col-sm-2" htmlfor="articleNo">
							Article Number :{' '}
						</label>
						<input
							value={this.state.articleNo}
							type="number"
							step="0.01"
							className="form-control"
							id="articleNo"
						/>
					</div>
					<div className="form-group">
						<label className="p-1 control-label col-sm-2" htmlfor="name">
							Name :{' '}
						</label>
						<input value={this.state.name} type="text" className="form-control " id="name" />
					</div>
					<div className="form-group">
						<label className="p-1 control-label col-sm-2" htmlfor="BasePrice">
							Base Price :{' '}
						</label>
						<input
							value={this.state.BasePrice}
							type="number"
							step="0.01"
							className="form-control "
							id="BasePrice"
						/>
					</div>
					<div className="form-group">
						<label className="p-1 control-label" htmlfor="MRP">
							MRP :{' '}
						</label>
						<input value={this.state.MRP} type="number" step="0.01" className="form-control " id="MRP" />
					</div>
					<div className="form-group">
						<label className="p-1 control-label" htmlfor="GST">
							GST :{' '}
						</label>
						<input value={this.state.GST} type="number" step="0.01" className="form-control " id="GST" />
					</div>
					<div className="form-group">
						<label className="p-1 control-label" htmlfor="AgreedMargin">
							Agreed Margin :{' '}
						</label>
						<input
							value={this.state.AgreedMargin}
							type="number"
							step="0.01"
							className="form-control "
							id="AgreedMargin"
						/>
					</div>
					<div className="d-flex justify-content-center">
						<h5 style={mystyle}>margin is : {this.state.margin}</h5>
					</div>
					<div className="d-flex justify-content-center">
						<input
							type="submit"
							className="btn btn-primary"
							value="Confirm Add"
							data-dismiss="modal"
							onClick={this.handleOnSubmit}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default connect(() => {}, { additem })(AddItem);
