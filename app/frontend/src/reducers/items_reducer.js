import { GET_ITEMS, ADD_ITEMS, MOD_ITEMS, DEL_ITEMS } from '../actions/types';

const initialstate = {
	items : []
};

const itemsReducer = (state = initialstate, action) => {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state,
				items : action.payload
			};
		case ADD_ITEMS:
			return {
				...state,
				items : [ ...state.items, action.payload ]
			};
		case MOD_ITEMS:
			const s = { ...state };
			s.items.map((item) => {
				if ((item.articleNo === action.payload.articleNo)) return action.payload;
				return item;
			});
			return s;
		case DEL_ITEMS:
			return {
				items: state.items.filter((item) => item.articleNo !== action.payload)
			};
		default:
			return state;
	}
};
export default itemsReducer;
