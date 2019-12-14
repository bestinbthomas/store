import {GET_ERRORS, GET_MESSAGES, REGISTER_FAIL, REGISTER_SUCCESS} from '../actions/types'

const initialState = {
    msg: {},
    status: null
};

export const error = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            if (action.payload.response)
                return {
                    msg: action.payload.response.data,
                    status: action.payload.response.status
                };
            else return state;
        default:
            return state;
    }
};

export const message = (state = {msg: ""}, action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                msg: action.payload
            };
        case REGISTER_SUCCESS:
            return {
                msg: `User created with username ${action.payload.user.username}`
            };
        default:
            return state;
    }
};