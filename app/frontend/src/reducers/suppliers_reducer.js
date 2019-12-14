import { GET_SUPPLIERS, ADD_SUPPLIERS, MOD_SUPPLIERS, DEL_SUPPLIERS } from '../actions/types';

const initialstate = {
	suppliers : []
};

const suppliersReducer = (state = initialstate, action) => {
	switch (action.type) {
		case GET_SUPPLIERS:
			return {
				...state,
				suppliers : action.payload
			};
		case ADD_SUPPLIERS:
			return {
				...state,
				suppliers : [ ...state.suppliers, action.payload ]
			};
		case MOD_SUPPLIERS:
			const s = { ...state };
			s.suppliers.map((supplier) => {
				if ((supplier.name === action.payload.name)) return action.payload;
				return supplier;
			});
			return s;
		case DEL_SUPPLIERS:
			return {
				suppliers: state.suppliers.filter((supplier) => supplier.name !== action.payload)
			};
		default:
			return state;
	}
};
export default suppliersReducer;
