import ActionTypes from './actionTypes';
import * as fbConfigs from '../../configs/dbconfigs';

export function loadInitialState() {
  return dispatch => {
    dispatch(loadInitialStateAction())
  }
}

function loadInitialStateAction() {
  return {
    type: ActionTypes.LoadInitialState
  };
}

function LoginRequestSuccess(data) {
    return {
        type: ActionTypes.LoginRequestSuccess,
        data
    };
}