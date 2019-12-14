import axios from 'axios';
import { GET_INVOICES, ADD_INVOICE, GET_ERRORS, GET_MESSAGES } from './types';
import { getTokenConfig } from './auth_action';

export const getInvoices = () => (dispatch, getState) => {
	const config = getTokenConfig(getState);
	axios
		.get('api/invoices/', config)
		.then((res) => {
			dispatch({
				type    : GET_INVOICES,
				payload : res.data
			});
		})
		.catch((err) => {
			dispatch({
				type    : GET_ERRORS,
				payload : err
			});
		});
};

export const addInvoices = (invoices) => (dispatch, getState) => {
	axios
		.post('/api/invoices/', invoices, getTokenConfig(getState))
		.then((res) => {
			dispatch({
				type    : GET_MESSAGES,
				payload : `Invoice added`
			});
			dispatch({
				type    : ADD_INVOICE,
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
