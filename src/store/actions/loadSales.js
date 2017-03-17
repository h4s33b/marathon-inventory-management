import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function loadSalesRequest(loadSalesData) {
    return dispatch => {
        //dispatch(LoadSalesRequest());
        if(loadSalesData){
            return fbConfigs.database.ref('/Sales/'+loadSalesData.uid).orderByChild('userEmail').equalTo(loadSalesData.email).once('value', snap => {
                const todo = [];
                snap.forEach(childSnapshot => {
                    var innerTodo = childSnapshot.val();
                    innerTodo.key = childSnapshot.key;
                        todo.push(innerTodo);
                })
                dispatch(loadSalesRequestSuccess(todo))
            });
        }else{
            dispatch(loadSalesRequestFailed())
        }
    }
}

function LoadSalesRequest() {
    return {
        type: ActionTypes.loadSalesRequest
    };
}

function loadSalesRequestSuccess(data) {
    return {
        type: ActionTypes.loadSalesRequestSuccess,
        data
    };
}

function loadSalesRequestFailed() {
    return {
        type: ActionTypes.loadSalesRequestFailed
    };
}