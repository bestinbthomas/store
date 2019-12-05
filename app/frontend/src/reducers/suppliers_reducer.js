import { GET_SUPPLIERS, ADD_SUPPLIERS } from '../actions/types';

const initialstate = {
	suppliers : [
		// {
		// 	name   : 'Neil',
		// 	contct : '999999999',
		// 	GST_NO : 26455154
		// },
		// {
		// 	name   : 'supplier 2',
		// 	contct : '8888888888',
		// 	GST_NO : 454518
		// },
		// {
		// 	name   : 'supplier 3',
		// 	contct : '7777777777',
		// 	GST_NO : 545548
		// }
	]
};

const suppliersReducer = (state = initialstate, action) => {
	switch (action.type) {
		case GET_SUPPLIERS:
			return {
				...state,
				suppliers : action.payload
			};
		default:
			return state;
	}
};
export default suppliersReducer;
