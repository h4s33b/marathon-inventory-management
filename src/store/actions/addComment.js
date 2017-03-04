import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function updateReportRequest(reportData) {
    return dispatch => {
        dispatch(UpdateReportRequest());
        return fbConfigs.database.ref('/crimes/'+reportData.objectKey+'/comments').push(reportData.comment).then((data)=>{
            alert("Successfully updateed.");
            dispatch(updateReportRequestSuccess(data));
        })
    }
}

function UpdateReportRequest() {
    return {
        type: ActionTypes.updateReportRequest
    };
}

function updateReportRequestSuccess(data) {
    return {
        type: ActionTypes.updateReportRequestSuccess,
        data
    };
}

function updateReportRequestFailed() {
    return {
        type: ActionTypes.updateReportRequestFailed
    };
}