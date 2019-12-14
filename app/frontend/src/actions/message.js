import {GET_MESSAGES} from "./types";

export const showMessage = (msg) => (dispatch) => {
    dispatch({
        type : GET_MESSAGES,
        payload : msg
    })
};