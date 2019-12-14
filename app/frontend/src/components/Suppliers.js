import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSuppliers, deleteSupplier } from '../actions/suppliers_actions';
import { getInvoices } from '../actions/invoice_action';
import { showMessage } from '../actions/message';
import AddSupplier from './AddSupplier';
import PropTypes from 'prop-types';
import SupplierRow from './SupplierRow';

class Suppliers extends Component {
	state = {
		suppliers : this.props.suppliers,
		querry    : ''
	};
	componentDidMount() {
		this.props.getSuppliers();
		this.props.getInvoices();
	}

	searchChange = (e) => {
		this.setState({
			...this.state,
			querry : e.target.value.toLowerCase()
		});
	};

	delete = (name) => {
		if (this.props.invoices.findIndex((invoice) => invoice.Supplier === name) >= 0) {
			this.props.showMessage('cannot delete Supplier. It is assosiated with an invoice');
			return;
		}
		this.props.deleteSupplier(name);
	};

	render() {
		return (
			<div className="container-lg">
				<h1>Suppliers</h1>
				<button type="button" className="btn btn-light my-4" data-toggle="modal" data-target="#SupplierModel">
					New Supplier
				</button>
				<input
					id="filter"
					type="text"
					class="form-control"
					onChange={this.searchChange}
					placeholder="Search suppliers with name..."
				/>
				<table className="table table-striped my-5">
					<thead className="thead-dark">
						<tr>
							<th>Name</th>
							<th>Contact</th>
							<th>GST No</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{this.props.suppliers
							.filter((supplier) => supplier.name.toLowerCase().includes(this.state.querry))
							.map((supplier) => (
								<SupplierRow supplier={supplier} delete={(name) => this.delete(name)} />
							))}
					</tbody>
				</table>
				<div id="SupplierModel" className="modal fade" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4>Add Supplier</h4>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body">
								<AddSupplier />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	suppliers : state.supplier.suppliers,
	invoices  : state.invoice.invoices
});

export default connect(mapStateToProps, { getSuppliers, deleteSupplier, getInvoices, showMessage })(Suppliers);
