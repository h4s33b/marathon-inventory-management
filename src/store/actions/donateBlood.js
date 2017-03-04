import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function donateBloodRequest(donateBloodData) {
    return dispatch => {
        dispatch(DonateBloodRequest());
        fbConfigs.database.ref('/users/' + donateBloodData.uid + '/isDonor').once('value', isDonorsnap => {
            if (!isDonorsnap.val()) {
                return fbConfigs.database.ref('/users/' + donateBloodData.uid + '/isDonor').set(true, (data) => {
                    return fbConfigs.database.ref('/users').orderByChild('isDonor').equalTo(true).once('value', snap => {
                        const todo = [];
                        snap.forEach(childSnapshot => {
                            todo.push(childSnapshot.val());
                        })
                        alert("You have been added to Donar list.");
                        dispatch(donateBloodRequestSuccess(todo))
                    });
                });
            } else {
                alert("You have already been added to Donar list.");
            }
        })
    }
}

function DonateBloodRequest() {
    return {
        type: ActionTypes.donateBloodRequest
    };
}

function donateBloodRequestSuccess(data) {
    return {
        type: ActionTypes.donateBloodRequestSuccess,
        data
    };
}

function donateBloodRequestFailed() {
    return {
        type: ActionTypes.donateBloodRequestFailed
    };
}