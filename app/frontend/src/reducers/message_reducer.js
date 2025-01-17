import {GET_MESSAGES} from '../actions/types'

const initialState  = {
    msg : {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload
            };
        default:
            return state;
    }
}