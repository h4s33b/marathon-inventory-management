import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function loadPurchasesRequest(loadPurchasesData) {
    return dispatch => {
        //dispatch(LoadPurchasesRequest());
        if(loadPurchasesData){
            return fbConfigs.database.ref('/Purchase/'+loadPurchasesData.uid).orderByChild('userEmail').equalTo(loadPurchasesData.email).once('value', snap => {
                const todo = [];
                snap.forEach(childSnapshot => {
                    var innerTodo = childSnapshot.val();
                    innerTodo.key = childSnapshot.key;
                        todo.push(innerTodo);
                })
                dispatch(loadPurchasesRequestSuccess(todo))
            });
        }else{
            dispatch(loadPurchasesRequestFailed())
        }
    }
}

function LoadPurchasesRequest() {
    return {
        type: ActionTypes.loadPurchasesRequest
    };
}

function loadPurchasesRequestSuccess(data) {
    return {
        type: ActionTypes.loadPurchasesRequestSuccess,
        data
    };
}

function loadPurchasesRequestFailed() {
    return {
        type: ActionTypes.loadPurchasesRequestFailed
    };
}