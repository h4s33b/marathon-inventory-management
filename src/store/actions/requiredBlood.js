import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function requiredBloodRequest(requiredBloodData) {
    return dispatch => {
        dispatch(RequiredBloodRequest());
        return fbConfigs.database.ref('/users').orderByChild('isDonor').equalTo(true).once('value', snap => {
            const todo = [];
            snap.forEach(childSnapshot => {
                todo.push(childSnapshot.val());
            })
            dispatch(requiredBloodRequestSuccess(todo))
        });
    }
}

function RequiredBloodRequest() {
    return {
        type: ActionTypes.requiredBloodRequest
    };
}

function requiredBloodRequestSuccess(data) {
    return {
        type: ActionTypes.requiredBloodRequestSuccess,
        data
    };
}

function requiredBloodRequestFailed() {
    return {
        type: ActionTypes.requiredBloodRequestFailed
    };
}