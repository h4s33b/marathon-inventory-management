import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function viewAllCrimesRequest(viewAllCrimesData) {
    return dispatch => {
        dispatch(ViewAllCrimesRequest());
        return fbConfigs.database.ref('/crimes').once('value', snap => {
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
            dispatch(viewAllCrimesRequestSuccess(todo))
        });
    }
}

function ViewAllCrimesRequest() {
    return {
        type: ActionTypes.viewAllCrimesRequest
    };
}

function viewAllCrimesRequestSuccess(data) {
    return {
        type: ActionTypes.viewAllCrimesRequestSuccess,
        data
    };
}

function viewAllCrimesRequestFailed() {
    return {
        type: ActionTypes.viewAllCrimesRequestFailed
    };
}