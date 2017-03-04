import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function loadCrimesRequest(loadCrimesData) {
    return dispatch => {
        dispatch(LoadCrimesRequest());
        return fbConfigs.database.ref('/crimes').orderByChild('isPublic').equalTo(true).once('value', snap => {
            const todo = [];
            snap.forEach(childSnapshot => {
                var innerTodo = childSnapshot.val();
                innerTodo.key = childSnapshot.key;
                if(childSnapshot.hasChild('comments')){
                    var customComments = Object.keys(childSnapshot.val().comments).map(key=>{return {key:childSnapshot.val().comments[key]}})
                    console.log(customComments);
                    innerTodo.comments = customComments;
                    todo.push(innerTodo);
                }else{
                    todo.push(innerTodo);
                }
            })
            dispatch(loadCrimesRequestSuccess(todo))
        });
    }
}

function LoadCrimesRequest() {
    return {
        type: ActionTypes.loadCrimesRequest
    };
}

function loadCrimesRequestSuccess(data) {
    return {
        type: ActionTypes.loadCrimesRequestSuccess,
        data
    };
}

function loadCrimesRequestFailed() {
    return {
        type: ActionTypes.loadCrimesRequestFailed
    };
}