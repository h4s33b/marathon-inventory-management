import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function loadProductsRequest(loadProductsData) {
    return dispatch => {
        dispatch(LoadProductsRequest());
        if(loadProductsData){
            return fbConfigs.database.ref('/products').orderByChild('userEmail').equalTo(loadProductsData.email).once('value', snap => {
                const todo = [];
                snap.forEach(childSnapshot => {
                    var innerTodo = childSnapshot.val();
                    innerTodo.key = childSnapshot.key;
                        todo.push(innerTodo);
                })
                dispatch(loadProductsRequestSuccess(todo))
            });
        }else{
            dispatch(loadProductsRequestFailed())
        }
    }
}

function LoadProductsRequest() {
    return {
        type: ActionTypes.loadProductsRequest
    };
}

function loadProductsRequestSuccess(data) {
    return {
        type: ActionTypes.loadProductsRequestSuccess,
        data
    };
}

function loadProductsRequestFailed() {
    return {
        type: ActionTypes.loadProductsRequestFailed
    };
}