import { GET_SUPPLIERS, ADD_SUPPLIERS } from '../actions/types';

const initialstate = {
	items : [
		// {
		// 	name      : 'Bourbon',
		// 	articleNo : 1,
		// 	BasePrice : 22,
		// 	MRP       : 25,
		// 	GST       : 10,
		// 	Agreedmargin: 3
		// }
	]
};

const itemsReducer = (state = initialstate, action) => {
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
export default itemsReducer;
