import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function logOutRequest(loginData) {
    return dispatch => {
        dispatch(LogOutRequest());
        return fbConfigs.fbAuth.signOut()
            .then((data) => {
                dispatch(logOutRequestSuccess());
            })
            .catch((error) => {
                dispatch(logOutRequestFailed());
            });
    }
}

function LogOutRequest() {
    return {
        type: ActionTypes.logOutRequest
    };
}

function logOutRequestSuccess() {
    return {
        type: ActionTypes.logOutRequestSuccess
    };
}

function logOutRequestFailed() {
    return {
        type: ActionTypes.logOutRequestFailed
    };
}