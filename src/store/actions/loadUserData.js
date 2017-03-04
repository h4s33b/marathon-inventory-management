import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function loadUserRequest(loadUserData) {
    return dispatch => {
        dispatch(LoadUserRequest());
    }
}

function LoadUserRequest() {
    return {
        type: ActionTypes.loadUserRequest
    };
}