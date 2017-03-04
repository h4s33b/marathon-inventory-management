import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function SignUpRequest(SignUpData) {
    return dispatch => {
        dispatch(signUpRequest());
        fbConfigs.fbAuth.createUserWithEmailAndPassword(
            SignUpData.email, SignUpData.password
        )
            .then((data) => {
                const userRef = fbConfigs.database.ref('/users/' + data.uid);
                userRef.set({
                    uid : data.uid,
                    email: data.email,
                    name: SignUpData.name, gender: SignUpData.gender == 1 ? "Male" : "Female", address: SignUpData.address, cityname: SignUpData.cityname, cellNumber: SignUpData.cellNumber
                }, signUpSuccessData => {
                    dispatch(SignUpRequestSuccess({ uid: data.uid, userEmail: data.email, name: SignUpData.name, gender: SignUpData.gender == 1 ? "Male" : "Female", address: SignUpData.address, cityname: SignUpData.cityname, cellNumber: SignUpData.cellNumber }));
                });
            })
            .catch((error) => {
                alert("Error Occurred Please try again.");
                dispatch(SignUpRequestFailed(error));
            });
    }
}

function signUpRequest() {
    return {
        type: ActionTypes.SignUpRequest
    };
}

function SignUpRequestSuccess(data) {
    return {
        type: ActionTypes.SignUpRequestSuccess,
        data
    };
}

function SignUpRequestFailed() {
    return {
        type: ActionTypes.SignUpRequestFailed
    };
}