import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function addPurchasesRequest(PurchaseData) {
    return dispatch => {
        dispatch(AddPurchaseRequest());
        return fbConfigs.database.ref('/Purchase/' + PurchaseData.uid).push(PurchaseData).then((data) => {
            return fbConfigs.database.ref('/products/' + PurchaseData.productId).once('value', snap => {
                var oldQuantity = snap.val().quantity;
                var newQuantity = parseInt(oldQuantity) + parseInt(PurchaseData.quantity);
                return fbConfigs.database.ref('/products/' + PurchaseData.productId + "/quantity").set(newQuantity, (done) => {
                    alert("Successfully Added.");
                    dispatch(addPurchaseRequestSuccess(data));
                });
            })
        })
    }
}

function AddPurchaseRequest() {
    return {
        type: ActionTypes.addPurchaseRequest
    };
}

function addPurchaseRequestSuccess(data) {
    return {
        type: ActionTypes.addPurchaseRequestSuccess,
        data
    };
}

function addPurchaseRequestFailed() {
    return {
        type: ActionTypes.addPurchaseRequestFailed
    };
}