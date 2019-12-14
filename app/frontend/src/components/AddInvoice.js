import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSuppliers } from '../actions/suppliers_actions';
import { getItems } from '../actions/items_actions';
import { getInvoices, addInvoices } from '../actions/invoice_action';
import { showMessage } from '../actions/message';
import AddItem from './AddItem';
import ItemRow from './ItemRow';

class AddInvoice extends Component {
	initialstate = {
		invoice : {
			InvoiceNo : 0,
			Supplier  : '',
			items     : []
		},
		items   : []
	};
	state = {
		invoice : {
			InvoiceNo : 0,
			Supplier  : '',
			items     : []
		},
		items   : []
	};

	addItem = () => {
		this.setState((prev) => ({
			invoice : {
				...prev.invoice,
				items : [ ...prev.invoice.items, 'new' ]
			}
		}));
		return false;
	};
	static propTypes = {
		invoices  : PropTypes.array.isRequired,
		items     : PropTypes.array.isRequired,
		suppliers : PropTypes.array.isRequired
	};

	componentDidMount() {
		this.props.getInvoices();
		this.props.getSuppliers();
		this.props.getItems();
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.invoice.InvoiceNo === 0) {
			this.props.showMessage('Invoice Number Required');
			return;
		}
		if (this.state.invoice.Supplier === '') {
			this.props.showMessage('Supplier required');
			return;
		}
		this.props.addInvoices(this.state.invoice);
		this.setState({ ...this.initialstate });
		document.getElementById('Supplier').selectedIndex = 0;
	};
	delete = (articleNo) => {
		this.setState({
			...this.state,
			invoice : {
				...this.state.invoice,
				items : this.state.invoice.items.filter((no) => no !== articleNo)
			},
			items   : this.state.items.filter((item) => item.articleNo !== articleNo)
		});
	};
	handleChange = (e) => {
		const s = {
			...this.state
		};
		if (e.target.id === 'InvoiceNo') s['invoice'][e.target.id] = parseInt(e.target.value);
		else if (e.target.id === 'Supplier') s['invoice'][e.target.id] = e.target.value;
		this.setState(s);
	};
	addItem = (e) => {
		document.getElementById('ItemName').selectedIndex = 0;
		this.setState({
			...this.state,
			items   : [ ...this.state.items, this.props.items[0] ],
			invoice : {
				...this.state.invoice,
				items : [ ...this.state.invoice.items, this.props.items[0].articleNo ]
			}
		});
	};
	selectionChange = (e) => {
		const s = {
			...this.state
		};
		s.items[s.items.length - 1] = this.props.items.filter((item) => item.name === e.target.value)[0];
		s.invoice.items[s.items.length - 1] = this.props.items.filter(
			(item) => item.name === e.target.value
		)[0].articleNo;
		this.setState(s);
	};

	render() {
		const tableRows = (
			<tbody>
				{this.state.items.map((item) => <ItemRow item={item} delete={(articleNo) => this.delete(articleNo)} />)}
			</tbody>
		);

		return (
			<div>
				<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<div>
						<div className=" container form-group ">
							<h1 className="mx-5">ADD NEW INVOICE</h1>
							<label htmlfor="invoiceNo">Invoice Number</label>
							<input
								type="number"
								className="form-control"
								id="InvoiceNo"
								value={this.state.invoice.InvoiceNo}
							/>
						</div>
						<div className="container form-group">
							<label htmlfor="supplier">Supplier</label>
							<select className="form-control" id="Supplier">
								<option>------------</option>
								{this.props.suppliers.map((supplier) => <option>{supplier.name}</option>)}
							</select>
						</div>
						<div>
							{this.state.items.length > 0 ? (
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
									{tableRows}
								</table>
							) : (
								<span />
							)}
						</div>
						<div className="container d-flex justify-content-end">
							<button
								type="button"
								className="btn btn-info"
								data-toggle="modal"
								data-target="#itemInvoiceModel"
								onClick={(e) => this.addItem(e)}
							>
								Add Item
							</button>
						</div>
						<div className="form-group d-flex justify-content-center">
							<input type="submit" id="submit" className="btn btn-primary" value="Add Invoice" />
						</div>
					</div>
				</form>
				<div id="itemInvoiceModel" className="modal fade" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4>Add Item to invoice</h4>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body">
								<select className="form-control" id="ItemName" onChange={this.selectionChange}>
									{this.props.items.map((item) => <option>{item.name}</option>)}
								</select>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary"
									data-dismiss="modal"
									onClick={this.addItemToInvoice}
								>
									Add Item
								</button>
								<button
									type="button"
									className="btn btn-light"
									data-toggle="modal"
									data-target="#NewitemModel"
								>
									Create New Item
								</button>
							</div>
						</div>
					</div>
				</div>
				<div id="NewitemModel" className="modal fade" role="dialog">
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
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	invoices  : state.invoice.invoices,
	items     : state.items.items,
	suppliers : state.supplier.suppliers
});
export default connect(mapStateToProps, { getInvoices, addInvoices, getItems, getSuppliers, showMessage })(AddInvoice);
