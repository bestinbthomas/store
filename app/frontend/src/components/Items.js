import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, deleteItem } from '../actions/items_actions';
import AddItem from './AddItem';
import ItemRow from './ItemRow';
export class Items extends Component {
	static proptypes = {
		items : PropTypes.array.isRequired
	};
	state = {
		querry : ''
	};

	componentDidMount() {
		this.props.getItems();
	}
	delete = (articleNo) => {
		this.props.deleteItem(articleNo);
	};
	searchChange = (e) => {
		this.setState({
			...this.state,
			querry : e.target.value.toLowerCase()
		});
	};
	render() {
		return (
			<Fragment>
				<div className="container">
					<h1>Items </h1>
					<button type="button" className="btn btn-light my-4" data-toggle="modal" data-target="#itemModel">
						New Item
					</button>
					<input
						id="filter"
						type="text"
						class="form-control"
						onChange={this.searchChange}
						placeholder="Search items by name..."
					/>
				</div>
				<table className="table table-striped my-3 mx-1">
					<thead className="thead-dark">
						<tr>
							<th scope="col">Article Number</th>
							<th scope="col">Name</th>
							<th scope="col">Base Price</th>
							<th scope="col">MRP</th>
							<th scope="col">GST</th>
							<th scope="col">Agreed Margin</th>
							<th scope="col">Margin</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{this.props.items
							.filter((item) => item.name.toLowerCase().includes(this.state.querry))
							.map((item) => <ItemRow item={item} delete={(articleNo) => this.delete(articleNo)} />)}
					</tbody>
				</table>
				<div id="itemModel" className="modal fade" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4>Add Item</h4>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body">
								<AddItem />
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	items : state.items.items
});

export default connect(mapStateToProps, { getItems, deleteItem })(Items);
