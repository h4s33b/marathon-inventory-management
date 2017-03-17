import { connect } from 'react-redux';
import LoadPurchase from '../components/purchase/loadPurchase';
import { loadInitialState } from '../store/actions/loadInitialState';
import { loadPurchasesRequest } from '../store/actions/loadPurchase';
import { loadUserRequest } from '../store/actions/loadUserData';
import { childAddedHandler } from '../store/actions/childAddedHandler';

function mapStateToProps(state) {
  //here we are mapping the redux state to props so we can use it in our components
  return {
    application: state.application
  };
}

function mapDispatchToProps(dispatch) {
  childAddedHandler(dispatch);
  //Those will be the actions we will be Triggerening from Components
  return {
    loadInitialState    : () => dispatch(loadInitialState()),
    loadUserRequest     : () => dispatch(loadUserRequest()),
    loadPurchaseRequest   : (data) => dispatch(loadPurchasesRequest(data))
  };
}

const LoadPurchaseContainer = connect(mapStateToProps, mapDispatchToProps)(LoadPurchase);

export default LoadPurchaseContainer;