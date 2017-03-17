import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function updateProductRequest(ProductData) {
    return dispatch => {
        dispatch(UpdateProductRequest());
        var idToUpdate =ProductData.productId;
        return fbConfigs.database.ref('/products/'+idToUpdate).update(ProductData).then((data)=>{
            alert("Successfully updated.");
            dispatch(updateProductRequestSuccess(data));
        })
    }
}

function UpdateProductRequest() {
    return {
        type: ActionTypes.updateProductRequest
    };
}

function updateProductRequestSuccess(data) {
    return {
        type: ActionTypes.updateProductRequestSuccess,
        data
    };
}

function updateProductRequestFailed() {
    return {
        type: ActionTypes.updateProductRequestFailed
    };
}