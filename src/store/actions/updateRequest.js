import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function updateBloodRequest(updateBloodData) {
    return dispatch => {
        dispatch(UpdateBloodRequest());
        return fbConfigs.database.ref('/users/' + updateBloodData.uid + '/isDonor').set(false, (data) => {
            return fbConfigs.database.ref('/users').orderByChild('isDonor').equalTo(true).once('value', snap => {
                const todo = [];
                snap.forEach(childSnapshot => {
                    todo.push(childSnapshot.val());
                })
                dispatch(updateBloodRequestSuccess(todo))
            });
        });
    }
}

function UpdateBloodRequest() {
    return {
        type: ActionTypes.updateBloodRequest
    };
}

function updateBloodRequestSuccess(data) {
    return {
        type: ActionTypes.updateBloodRequestSuccess,
        data
    };
}

function updateBloodRequestFailed() {
    return {
        type: ActionTypes.updateBloodRequestFailed
    };
}