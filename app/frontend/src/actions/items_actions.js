import axios from 'axios';
import { GET_ITEMS, ADD_ITEMS, MOD_ITEMS, DEL_ITEMS, GET_ERRORS, GET_MESSAGES } from './types';
import { getTokenConfig } from './auth_action';

export const getItems = () => (dispatch, getState) => {
	axios
		.get('/api/items/', getTokenConfig(getState))
		.then((res) => {
			dispatch({
				type    : GET_ITEMS,
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

export const additem = (item) => (dispatch, getState) => {
	axios
		.post('/api/items/', item, getTokenConfig(getState))
		.then((res) => {
			dispatch({
				type    : GET_MESSAGES,
				payload : `Item Added`
			});
			dispatch({
				type    : ADD_ITEMS,
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

export const modifyItem = (item) => (dispatch, getState) => {
	const url = '/api/items/' + item.articleNo + '/';
	axios
		.put(url, item, getTokenConfig(getState))
		.then((res) => {
			dispatch({
				type    : GET_MESSAGES,
				payload : `Item Modified`
			});
			dispatch({
				type    : MOD_ITEMS,
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

export const deleteItem = (articleNo) => (dispatch, getState) => {
	const url = '/api/items/' + articleNo + '/';
	if (confirm(`Do you really want to delete Item with Article Number ${articleNo}`))
		axios
			.delete(url, getTokenConfig(getState))
			.then((res) => {
				dispatch({
					type    : GET_MESSAGES,
					payload : `Item Deleted`
				});
				dispatch({
					type    : DEL_ITEMS,
					payload : articleNo
				});
			})
			.catch((err) =>
				dispatch({
					type    : GET_ERRORS,
					payload : err
				})
			);
};
