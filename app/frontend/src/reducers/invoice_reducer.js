import { GET_INVOICES, ADD_INVOICE } from '../actions/types';

const initialstate = {
	invoices : []
};

const invoiceReducer = (state = initialstate, action) => {
	switch (action.type) {
		case GET_INVOICES:
			return {
				...state,
				invoices : action.payload
			};
		case ADD_INVOICE:
			return {
				...state,
				invoices : [ ...state.invoices, action.payload ]
			};
		default:
			return state;
	}
};
export default invoiceReducer;
