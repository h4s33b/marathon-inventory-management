import ActionTypes from './actionTypes';

export function decrementCounter() {
  return dispatch => {
    dispatch(getDecrementFulfilledAction())
  }
}

function getDecrementFulfilledAction() {
  return {
    type: ActionTypes.DecrementCounterSuccess
  };
}