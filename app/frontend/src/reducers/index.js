import { combineReducers } from 'redux';
import supplier from './suppliers_reducer';
import items from './items_reducer';
import invoice from './invoice_reducer';

export default combineReducers({
	supplier,
	items,
	invoice
});
