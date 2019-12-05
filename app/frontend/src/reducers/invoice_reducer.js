import { GET_SUPPLIERS, ADD_SUPPLIERS } from '../actions/types';

const initialstate = {
	invoices : [
		// 	{
		// 		invoiceNo    : 5484515,
		// 		SupplierName : 'Supplier 1',
		// 		datetime     : '12/12/2019'
		// 	},
	]
};

const invoiceReducer = (state = initialstate, action) => {
	switch (action.type) {
		case GET_SUPPLIERS:
			return {
				...state,
				items : action.payload
			};
		default:
			return state;
	}
};
export default invoiceReducer;
