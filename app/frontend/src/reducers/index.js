import { combineReducers } from 'redux';
import supplier from './suppliers_reducer';
import items from './items_reducer';
import invoice from './invoice_reducer';
import auth from './auth_reducer'
import {error,message} from './error_reducer'

export default combineReducers({
	error,
	message,
	supplier,
	items,
	invoice,
	auth
});
