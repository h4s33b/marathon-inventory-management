import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function addSalesRequest(SalesData) {
    return dispatch => {
        dispatch(AddSalesRequest());
        SalesData.isPublic = SalesData.inicidentType != 3 ? true : false;
        return fbConfigs.database.ref('/Sales/' + SalesData.uid).push(SalesData).then((data) => {
            //alert("Successfully Added.");
            return fbConfigs.database.ref('/products/' + SalesData.productId).once('value', snap => {
                var oldQuantity = snap.val().quantity;
                var newQuantity = oldQuantity - SalesData.quantity;
                return fbConfigs.database.ref('/products/' + SalesData.productId + "/quantity").set(newQuantity, (done) => {
                    alert("Successfully Added.");
                    dispatch(addSalesRequestSuccess(data));
                });
            })
        })
    }
}

function AddSalesRequest() {
    return {
        type: ActionTypes.addSalesRequest
    };
}

function addSalesRequestSuccess(data) {
    return {
        type: ActionTypes.addSalesRequestSuccess,
        data
    };
}

function addSalesRequestFailed() {
    return {
        type: ActionTypes.addSalesRequestFailed
    };
}