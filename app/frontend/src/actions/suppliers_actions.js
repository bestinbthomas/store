import axios from 'axios';

import { GET_SUPPLIERS, ADD_SUPPLIERS, MOD_SUPPLIERS, DEL_SUPPLIERS, GET_ERRORS, GET_MESSAGES } from './types';
import { getTokenConfig } from './auth_action';

export const getSuppliers = () => (dispatch, getState) => {
	axios
		.get('/api/suppliers/', getTokenConfig(getState))
		.then((res) => {
			dispatch({
				type    : GET_SUPPLIERS,
				payload : res.data
			});
		})
		.catch((err) =>
			dispatch({
				type    : GET_ERRORS,
				payload : err
			})
		);
};

export const addSupplier = (supplier) => (dispatch, getState) => {
	axios
		.post('/api/suppliers/', supplier, getTokenConfig(getState))
		.then((res) => {
			dispatch({
				type    : GET_MESSAGES,
				payload : `Supplier Added`
			});
			dispatch({
				type    : ADD_SUPPLIERS,
				payload : res.data
			});
		})
		.catch((err) =>
			dispatch({
				type    : GET_ERRORS,
				payload : err
			})
		);
};

export const modifySupplier = (supplier) => (dispatch, getState) => {
	const url = '/api/suppliers/' + supplier.name + '/';
	axios
		.put(url, supplier, getTokenConfig(getState))
		.then((res) => {
			dispatch({
				type    : GET_MESSAGES,
				payload : `Supplier Modified`
			});
			dispatch({
				type    : MOD_SUPPLIERS,
				payload : res.data
			});
		})
		.catch((err) =>
			dispatch({
				type    : GET_ERRORS,
				payload : err
			})
		);
};

export const deleteSupplier = (supplierName) => (dispatch, getState) => {
	const url = '/api/suppliers/' + supplierName + '/';
	if (confirm(`Do you really want to delete Supplier ${supplierName}`))
		axios
			.delete(url, getTokenConfig(getState))
			.then((res) => {
				dispatch({
					type    : GET_MESSAGES,
					payload : `Supplier Deleted`
				});
				dispatch({
					type    : DEL_SUPPLIERS,
					payload : supplierName
				});
			})
			.catch((err) => {
				dispatch({
					type    : GET_ERRORS,
					payload : err
				});
			});
};
