import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { modifyItem, deleteItem } from '../actions/items_actions';

class ItemRow extends Component {
	state = { ...this.props.item };

	handleChange = (e) => {
		const s = {
			...this.state
		};

		if (e.target.id === 'name') s[e.target.id] = e.target.value;
		else s[e.target.id] = parseFloat(e.target.value);

		this.setState(s);
	};
	save = (e) => {
		this.props.modifyItem(this.state);
	};

	render() {
		if (this.props.item.articleNo !== this.state.articleNo) this.setState({ ...this.props.item });
		const margin =
			Math.round((this.state.MRP - this.state.BasePrice * (1 + this.state.GST)) / this.state.MRP * 100) / 100;
		let mystyle = {};
		if (margin < this.state.AgreedMargin) mystyle = { color: 'red' };
		return (
			<tr style={mystyle}>
				<th scope="row">{this.state.articleNo}</th>
				<td>
					<input onChange={this.handleChange} type="text" id="name" value={this.state.name} />
				</td>
				<td>
					<input
						onChange={this.handleChange}
						type="number"
						step="0.01"
						id="BasePrice"
						value={this.state.BasePrice}
					/>
				</td>
				<td>
					<input onChange={this.handleChange} type="number" step="0.01" id="MRP" value={this.state.MRP} />
				</td>
				<td>
					<input onChange={this.handleChange} type="number" step="0.01" id="GST" value={this.state.GST} />
				</td>
				<td>
					<input
						onChange={this.handleChange}
						type="number"
						step="0.01"
						id="AgreedMargin"
						value={this.state.AgreedMargin}
					/>
				</td>
				<td>{margin}</td>
				<td>
					<button type="button" onClick={this.save} className="btn btn-primary">
						save
					</button>
				</td>
				<td>
					<button
						type="button"
						onClick={(e) => this.props.delete(this.state.articleNo)}
						className="btn btn-danger"
					>
						delete
					</button>
				</td>
			</tr>
		);
	}
}

export default connect(() => {}, { modifyItem })(ItemRow);
