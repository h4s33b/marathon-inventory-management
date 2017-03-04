import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function addStoreRequest(StoreData) {
    return dispatch => {
        dispatch(AddStoreRequest());
        StoreData.isPublic =  StoreData.inicidentType!=3?true:false;
        return fbConfigs.database.ref('/Stores').push(StoreData).then((data)=>{
            alert("Successfully Added.");
            dispatch(addStoreRequestSuccess(data));
        })
    }
}

function AddStoreRequest() {
    return {
        type: ActionTypes.addStoreRequest
    };
}

function addStoreRequestSuccess(data) {
    return {
        type: ActionTypes.addStoreRequestSuccess,
        data
    };
}

function addStoreRequestFailed() {
    return {
        type: ActionTypes.addStoreRequestFailed
    };
}