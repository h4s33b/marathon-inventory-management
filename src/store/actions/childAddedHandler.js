import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function childAddedHandler(dispatch) {
    fbConfigs.database.ref('/crimes').on('child_added', (snap) => {
        const todo = snap.val();
        todo.key = snap.key;
        if(snap.hasChild('comments')){
            var customComments = Object.keys(snap.val().comments).map(key=>{return {key:snap.val().comments[key]}})
            console.log(customComments);
            todo.comments = customComments;
        }
        dispatch(addedReportRequestSuccess(todo));
        // snap.forEach(childSnapshot => {
        //         var innerTodo = childSnapshot.val();
        //         innerTodo.key = childSnapshot.key;
        //         if(childSnapshot.hasChild('comments')){
        //             var customComments = Object.keys(childSnapshot.val().comments).map(key=>{return {key:childSnapshot.val().comments[key]}})
        //             console.log(customComments);
        //             innerTodo.comments = customComments;
        //             todo.push(innerTodo);
        //         }else{
        //             todo.push(innerTodo);
        //         }
        //     })
        
    });
}

function addedReportRequestSuccess(todos) {
    return {
        type: ActionTypes.addedReportRequestSuccess,
        todos
    };
}