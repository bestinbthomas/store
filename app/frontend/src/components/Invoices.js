import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInvoices } from '../actions/invoice_action';
import { getItems } from '../actions/items_actions';
import { getSuppliers } from '../actions/suppliers_actions';
import { Link } from 'react-router-dom';

class Invoices extends Component {
	state = {
		supplier     : {},
		items        : [],
		modelContent : <span />,
		modelHead    : '',
		querry       : ''
	};
	static propTypes = {
		invoices : PropTypes.array.isRequired
	};

	componentDidMount() {
		this.props.getInvoices();
		this.props.getItems();
		this.props.getSuppliers();
	}
	showSupplier = (name) => {
		const supplier = this.props.suppliers.filter((sup) => {
			const bool = sup['name'] === name;
			return bool;
		})[0];
		const content = (
			<table>
				<table className="table table-striped my-5">
					<thead className="thead-dark">
						<tr>
							<th>Name</th>
							<th>Contact</th>
							<th>GST No</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{supplier.name}</td>
							<td>{supplier.contact}</td>
							<td>{supplier.GSTNo}</td>
						</tr>
					</tbody>
				</table>
			</table>
		);
		this.setState({
			...this.state,
			modelContent : content,
			modelHead    : 'Supplier'
		});
		$('#myModal').modal('toggle');
	};
	showItems = (itemNos) => {
		const mitems = this.props.items.filter((item) => {
			const bool = itemNos.includes(item['articleNo']);
			return bool;
		});
		const content = (
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
					</tr>
				</thead>
				<tbody>
					{mitems.map((item) => (
						<tr>
							<td>{item.articleNo}</td>
							<td>{item.name}</td>
							<td>{item.BasePrice}</td>
							<td>{item.MRP}</td>
							<td>{item.GST}</td>
							<td>{item.AgreedMargin}</td>
							<td>
								{
									// TODO find margin
								}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
		this.setState({
			...this.state,
			modelContent : content,
			modelHead    : 'Items'
		});
		$('#myModal').modal('toggle');
	};
	searchChange = (e) => {
		this.setState({
			...this.state,
			querry : e.target.value
		});
	};
	render() {
		return (
			<div className="container-lg">
				<h1>Invoices</h1>
				<Link className="btn btn-light my-3" to="/">
					Add New Invoice
				</Link>
				<input
					id="filter"
					type="text"
					class="form-control"
					onChange={this.searchChange}
					placeholder="Search Invoices with Invoice number or date..."
				/>
				<table className="table table-striped mt-4">
					<thead className="thead-dark">
						<tr>
							<th>Invoice Number</th>
							<th>Supplier</th>
							<th>Items</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{this.props.invoices
							.filter(
								(invoice) =>
									invoice.InvoiceNo.toString().includes(this.state.querry) ||
									invoice.date.includes(this.state.querry)
							)
							.map((invoice) => (
								<InvoiceRow
									invoice={invoice}
									showItems={(itemNos) => this.showItems(itemNos)}
									showSupplier={(name) => this.showSupplier(name)}
								/>
							))}
					</tbody>
				</table>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input
						onClick={this.props.getInvoices}
						type="submit"
						id="submit"
						className="btn btn-primary"
						value="Add Invoice"
					/>
				</form>
				<div id="myModal" className="modal fade" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4>{this.state.modelHead}</h4>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body">{this.state.modelContent}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const InvoiceRow = (props) => {
	return (
		<tr>
			<td>{props.invoice.InvoiceNo}</td>
			<td>
				<button
					type="button"
					className="btn btn-link"
					onClick={(e) => props.showSupplier(props.invoice.Supplier)}
				>
					{props.invoice.Supplier}
				</button>
			</td>
			<td>
				<button
					type="button"
					className="btn btn-info"
					onClick={(e) => {
						props.showItems(props.invoice.items);
					}}
				>
					{props.invoice.items.length}
				</button>
			</td>
			<td>{props.invoice.date}</td>
		</tr>
	);
};

const mapStateToProps = (state) => ({
	invoices  : state.invoice.invoices,
	items     : state.items.items,
	suppliers : state.supplier.suppliers
});

export default connect(mapStateToProps, { getInvoices, getItems, getSuppliers })(Invoices);
